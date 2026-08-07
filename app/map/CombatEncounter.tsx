import React, { useEffect, useState } from 'react'
import EnemyIcon from './EnemyIcon'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { Enemy, EnemyConverter } from '@/classes/enemy'
import { Character } from '@/classes/character'
import { useBoundStore } from '@/zustand/zustand'

interface props {
    location_id:string,
    endCombat: (param:any) => void
    completion_map: Array<{id: string, progress: number}>,
    setDeathMessage: (param:any) => void,
}

export default function CombatEncounter({location_id = "", endCombat, completion_map, setDeathMessage}:props) {

  const [enemies,setEnemies] = useState<Enemy[]>([])
  const [loading,setLoading] = useState(true)
  const [failReward,setFailReward] = useState(15)
  const [locationData,setLocationData] = useState({})
  const character:Character = useBoundStore((state:any) => state.character)
  const setCharacter = useBoundStore((state:any) => state.setCharacter)
  const [currentEnemy,setCurrentEnemy] = useState<Enemy|null>(null)
  const [waiting,setWaiting] = useState(false)

  useEffect(() => {
    startCombat()
  },[])

  async function endCombatHandler(newCharacter:Character, dead=false, enemy:Enemy = new Enemy("","","",0,0,0,0,0)) {
    if (dead) {
        newCharacter.hp = newCharacter.getLevel()
        newCharacter.xp += failReward
        setCharacter(newCharacter)
        setDeathMessage(enemy.death_note)
        endCombat(true)
    }
    else {
        const ref = completion_map.find((item) => item.id === location_id);
        if (ref) {
            ref.progress += 1;
        }
        newCharacter.hp = newCharacter.getLevel()
        newCharacter.xp += Math.floor(failReward * 1.5)
        setCharacter(newCharacter)
        endCombat(false)
    }
  }

  async function nextRound(targetedEnemy:Enemy, damage:number) {
    const newCharacter = character.clone(character.id,character.world_completion)
    setWaiting(true)

    // First the player will attack the enemy
    targetedEnemy.currentHP -= damage
    // If the enemy is dead, give the player some XP
    if (targetedEnemy.currentHP <= 0) {
        newCharacter.xp += targetedEnemy.reward
    }

    // Next all the enemies will attack the player (going from left to right)
    for (let i  = 0; i < enemies.length; i++) {
        // Check if the enemy is alive, if so attack.
        if (enemies[i].currentHP > 0) {
            setTimeout(() => {
                setCurrentEnemy(enemies[i])
                const highestStat = enemies[i].highestStat()
                newCharacter.hp -= newCharacter.getDamage(highestStat.type,highestStat.amount)

                // If the player is dead, end combat and boot them back to the map. Give 15XP plus the difficulty
                if (newCharacter.hp <= 0) {
                    endCombatHandler(newCharacter,true,enemies[i])
                    return
                }
            },500)
        }
    }

    // Filter array of dead enemies
    const refArray = enemies.filter((i) => i.currentHP > 0)

    // If all enemies are dead, end combat, heal player, give bonus xp, and increase the completion (if not maxed)
    if (refArray.length <= 0) {
        endCombatHandler(newCharacter,false)
        return
    }

    setCharacter(newCharacter)
    setWaiting(false)
  }

  async function startCombat() {
    setLoading(true)

    // First grab location data
    const docRef = doc(db,"locations",location_id)
    const docData = (await getDoc(docRef)).data()

    // Then grab enemy data
    const whitelist:Enemy[] = []
    if (docData) {
        setLocationData(docData)

        const difficultyRating = docData.challenge + (character.wins*1.2)
        // Update fail reward
        setFailReward(Math.floor(difficultyRating * 15))

        // Get all valid enemies
        for (const enemy_id of docData.enemies) {
            const enemyRef = doc(db,"enemies",enemy_id)
            const enemyDoc = await getDoc(enemyRef)
            const newEnemy:Enemy = EnemyConverter.fromFirebase(enemyDoc)
            whitelist.push(newEnemy)
        }

        // Pick a random number between 1 and max
        const enemyAmount = Math.floor(Math.random() * docData.max_enemies) + 1

        // Pick random enemies until we've hit the amount we want
        const chosenEnemies:Enemy[] = []
        for (let currentEnemies = 0; currentEnemies < enemyAmount; currentEnemies++) {
            const randomIndex = Math.floor(Math.random() * whitelist.length)
            const chosenEnemy = whitelist[randomIndex].clone()
            // Level up the enemy based on wins and location challenge
            chosenEnemy.levelUp(difficultyRating)
            chosenEnemies.push(chosenEnemy)
        }
        setEnemies(chosenEnemies)
        setLoading(false)
    }
  }

  return (
    <div className={`combat__container fade-in`}>
        {!loading && enemies.map((enemy,index) => <EnemyIcon key={index} enemy={enemy} nextRound={nextRound} currentEnemy={currentEnemy} waiting={waiting}/>)}
    </div>
  )
}

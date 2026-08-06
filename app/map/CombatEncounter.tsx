import React, { useEffect, useState } from 'react'
import EnemyIcon from './EnemyIcon'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { Enemy, EnemyConverter } from '@/classes/enemy'
import { Character } from '@/classes/character'
import { useBoundStore } from '@/zustand/zustand'

interface props {
    location_id:string,
    setCombat: (param:any) => void
}

export default function CombatEncounter({location_id = "", setCombat}:props) {

  const [enemies,setEnemies] = useState<Enemy[]>([])
  const [loading,setLoading] = useState(true)
  const [failReward,setFailReward] = useState(15)
  const character:Character = useBoundStore((state:any) => state.character)
  const setCharacter = useBoundStore((state:any) => state.setCharacter)

  useEffect(() => {
    startCombat()
  },[])

  function nextRound(targetedEnemy:Enemy, damage:number) {

    // First the player will attack the enemy
    targetedEnemy.currentHP -= damage
    // If the enemy is dead, give the player some XP
    if (targetedEnemy.currentHP <= 0) {
        character.xp += targetedEnemy.reward
    }

    // Next all the enemies will attack the player (going from left to right)
    for (let i  = 0; i < enemies.length; i++) {
        // Check if the enemy is alive, if so attack
        if (enemies[i].currentHP > 0) {
            const highestStat = enemies[i].highestStat()
            const newCharacter = character
            newCharacter.hp -= character.getDamage(highestStat.type,highestStat.amount)
            setCharacter(newCharacter)
            console.log(newCharacter.hp)
        }
    }

    // Filter array of dead enemies
    const refArray = enemies.filter((i) => i.currentHP > 0)
    setEnemies(refArray)

    // If the player is dead, end combat and boot them back to the map. Give 15XP plus the difficulty
    if (character.hp <= 0) {
        character.hp = character.getLevel()
        character.xp += failReward
        setCombat(false)
    }

    // If all enemies are dead, end combat and heal player
    if (refArray.length <= 0) {
        console.log(refArray.length)
        character.hp = character.getLevel()
        setCombat(false)
    }
  }

  async function startCombat() {
    setLoading(true)

    // First grab location data
    const docRef = doc(db,"locations",location_id)
    const docData = (await getDoc(docRef)).data()

    // Then grab enemy data
    const whitelist:Enemy[] = []
    if (docData) {

        const difficultyRating = docData.challenge + character.wins
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
    <div className="combat__container">
        {!loading && enemies.map((enemy,index) => <EnemyIcon key={index} enemy={enemy} nextRound={nextRound}/>)}
    </div>
  )
}

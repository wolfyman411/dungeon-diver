import React, { useEffect, useState } from 'react'
import EnemyIcon from './EnemyIcon'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { Enemy, EnemyConverter } from '@/classes/enemy'
import { Character } from '@/classes/character'
import { useBoundStore } from '@/zustand/zustand'

export default function CombatEncounter({location_id = ""}) {

  const [enemies,setEnemies] = useState<Enemy[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    startCombat()
  },[])

  async function startCombat() {
    setLoading(true)

    // First grab location data
    const docRef = doc(db,"locations",location_id)
    const docData = (await getDoc(docRef)).data()
    const character:Character = useBoundStore((state:any) => state.character)

    // Then grab enemy data
    const whitelist:Enemy[] = []
    if (docData) {

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
            const chosenEnemy = whitelist[randomIndex]
            // Level up the enemy based on wins and location challenge
            const difficultyRating = docData.challenge + character.wins
            chosenEnemy.levelUp(difficultyRating)
        }
        console.log(chosenEnemies)
        setEnemies(chosenEnemies)
        setLoading(false)
    }
  }

  return (
    <div className="combat__container">
        {!loading && enemies.map((enemy,index) => <EnemyIcon key={index} enemy={enemy}/>)}
    </div>
  )
}

import { Character } from '@/classes/character'
import { Enemy } from '@/classes/enemy'
import { useBoundStore } from '@/zustand/zustand'
import React from 'react'

interface props {
  enemy: Enemy
  nextRound: (param:any, param2:any) => void
}

export default function EnemyIcon({enemy, nextRound}:props) {

  const character:Character = useBoundStore((state:any) => state.character)

  function displayAttack() {

    if (!enemy) {
      return
    }

    let damageType = ""
    const highestStat = enemy.highestStat()
    if (highestStat.type === "muscle") {
      damageType = "physical"
    }
    else if (highestStat.type === "magic") {
      damageType = "magic"
    }
    else {
      damageType = "ranged"
    }
    return `${character.getDamage(highestStat.type,highestStat.amount)} ${damageType}`
  }

  function displayDamage() {
    if (character.class === "Warrior") {
      return Math.max(character.muscle - enemy.muscle,1)
    }
    else if (character.class === "Mage") {
      return Math.max(character.magic - enemy.magic,1)
    }
    else {
      return Math.max(character.moxie - enemy.moxie,1)
    }
  }

  return (
    <div className='enemy__wrapper'>
        <div className="enemy__info">{enemy?.enemy_name}</div>
        <img src={`/enemies/${enemy?.enemy_icon}`} alt="" />
        <div className="enemy__info">HP:{enemy?.currentHP}/{enemy?.hp}</div>
        <div className="enemy__info">Will deal <span className='red'>{displayAttack()} damage</span> next turn.</div>
        <div className="btn red" onClick={() => nextRound(enemy,displayDamage())}>Attack - {displayDamage()} Damage</div>
    </div>
  )
}

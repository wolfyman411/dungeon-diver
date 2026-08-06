import { Character } from '@/classes/character'
import { Enemy } from '@/classes/enemy'
import { useBoundStore } from '@/zustand/zustand'
import React from 'react'

interface props {
    enemy: Enemy
}

export default function EnemyIcon({enemy}:props) {

  const character:Character = useBoundStore((state:any) => state.character)

  function displayAttack() {
    let damageAmount = 0
    let damageType = ""
    if (enemy.muscle > enemy.magic && enemy.muscle > enemy.moxie) {
      damageAmount = Math.max(enemy.muscle - character.muscle,0)
      damageType = "physical"
    }
    else if (enemy.magic > enemy.muscle && enemy.magic > enemy.moxie) {
      damageAmount = Math.max(enemy.magic - character.magic,0)
      damageType = "magic"
    }
    else {
      damageAmount = Math.max(enemy.moxie - character.moxie,0)
      damageType = "ranged"
    }
    return `${damageAmount} ${damageType}`
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
        <div className="btn red">Attack - {displayDamage()} Damage</div>
    </div>
  )
}

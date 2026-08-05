import { Enemy } from '@/classes/enemy'
import React from 'react'

interface props {
    enemy?: Enemy
}

export default function EnemyIcon({enemy}:props) {
  return (
    <div className='enemy__wrapper'>
        <div className="enemy__info">{enemy?.enemy_name}</div>
        <img src={`/enemies/${enemy?.enemy_icon}`} alt="" />
        <div className="enemy__info">HP:{enemy?.currentHP}/{enemy?.hp}</div>
        <div className="enemy__info">Will deal <span className='red'>7 magical damage</span> next turn.</div>
        <div className="btn red">Attack - 3 Damage</div>
    </div>
  )
}

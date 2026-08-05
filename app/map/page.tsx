"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import MapIcon from './MapIcon'
import CharacterTab from '../components/CharacterTab'
import EnemyIcon from './EnemyIcon'

export default function page() {

  const [inCombat, setInCombat] = useState(false)

  function getHTML() {
    if (!inCombat) {
        return mapHTML()
    }
    else {
        return combatHTML()
    }
  }

  function mapHTML() {
    return (
        <div className="map__container">
            <div className="map__icons--wrapper">
                <MapIcon style={{left:"16%", bottom:"10%"}} location_name={"Village of Norm"} challenge_progress={0} challenges={7} icon={'Norm.svg'} accessible={true}/>
                <MapIcon style={{left:"24%", bottom:"42%"}} location_name={"Mushroom Grotto"} challenge_progress={0} challenges={10} icon={'Grotto.svg'} accessible={true}/>
                <MapIcon style={{left:"40%", bottom:"24%"}} location_name={"Bile Swamps"} challenge_progress={0} challenges={10} icon={'Swamp.svg'} accessible={true}/>
                <MapIcon style={{}} location_name={"Dark Fortress Walls"} challenge_progress={0} challenges={15} icon={'Walls.svg'} accessible={true}/>
                <MapIcon style={{left:"62%", bottom:"66%"}} location_name={"Dark Fortress"} challenge_progress={0} challenges={1} icon={'Fortress.svg'} accessible={true}/>
                <img style={{left:"20%", bottom:"22%"}} src={"/mapicons/Norm-Grotto.svg"} className='map__icon--path'/>
                <img style={{left:"26%", bottom:"18%"}} src={"/mapicons/Norm-Swamp.svg"} className='map__icon--path'/>
                <img style={{left:"48%", bottom:"36%"}} src={"/mapicons/Swamp-Walls.svg"} className='map__icon--path'/>
                <img style={{left:"34%", bottom:"50%"}} src={"/mapicons/Grotto-Walls.svg"} className='map__icon--path'/>
                <img style={{left:"56%", bottom:"56%"}} src={"/mapicons/Walls-Fortress.svg"} className='map__icon--path'/>
            </div>
        </div>
    )
  }

  function combatHTML() {
    return (
        <div className="combat__container">
            <EnemyIcon/>
            <EnemyIcon/>
            <EnemyIcon/>
        </div>
    )
  }

  return (
    <>
    <div className='map__header'>
        <div className="map__header__text">dungeon diver.</div>
    </div>
    <div className='map__wrapper'>
      <CharacterTab/>
      {getHTML()}
    </div>
    </>
  )
}

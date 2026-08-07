"use client"

import React, { useEffect, useState } from 'react'
import MapIcon from './MapIcon'
import CharacterTab from '../components/CharacterTab'
import { useBoundStore } from '@/zustand/zustand'
import { User } from '@/classes/user'
import { useRouter } from 'next/navigation'
import { Character } from '@/classes/character'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import CombatEncounter from './CombatEncounter'
import DeathMessage from './DeathMessage'

export default function page() {

  const [deathMessage, setDeathMessage] = useState("")
  const [isDead, setIsDead] = useState(false)
  const [inCombat, setInCombat] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const user:User = useBoundStore((state:any) => state.user)
  const character:Character = useBoundStore((state:any) => state.character)
  const setCharacter = useBoundStore((state:any) => state.setCharacter)
  
  const navigator = useRouter()

  useEffect(() => {
    logicCheck()
    updateMapInfo()
    updatePlayerInfo()
  },[user,character])

  function startCombat(location_id = "") {
    setInCombat(true)
    setSelectedLocation(location_id)
  }

  async function endCombat(dead=false) {

    console.log(dead)

    setIsDead(dead)
    setInCombat(false)

    // Check if location is last location and not dead
    if (!dead && selectedLocation === "Rw4dI8JsQXkZiH7eFPqZ") {
      navigator.push("/ending")
    }

    setSelectedLocation("")
  }

  async function updatePlayerInfo() {
    if (!character.id) {
      return
    }
    const docRef = doc(db,"character",character.id)
    setDoc(docRef,{muscle:character.muscle, magic:character.magic, moxie:character.moxie, xp:character.xp, wins:character.wins, world_completion:character.world_completion, hp:character.getLevel()}, {merge:true})
  }

  async function updateMapInfo() {
    if (!user.character_id || !character.class) {
      return
    }

    console.log(character)

    // Create map progress
    if (character.world_completion.length <= 0) {
      console.log("Build values")
      const locationsRef = collection(db,"locations")
      const locationsSnapshot = await getDocs(locationsRef)
      const newWorldCompletion: Array<{id: string, progress: number}> = [];

      if (!locationsSnapshot.empty) {
        for (const location of locationsSnapshot.docs) {
          newWorldCompletion.push({id:location.id, progress:0})
        }

        const newCharacter = character
        newCharacter.world_completion = newWorldCompletion
        setCharacter(newCharacter)
        const docRef = doc(db,"character",character.id)
        setDoc(docRef,{world_completion:character.world_completion}, {merge:true})
      }
    }
  }

  function logicCheck() {
    if (!user.id) {
        navigator.push("/")
    }

    if (character.class === "") {
        navigator.push("/character")
    }
  }

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
                <MapIcon style={{left:"16%", bottom:"10%"}} location_img="Norm.svg" location_id={"6rLKOYGrkkM1jhVhzCWl"} completion_map={character.world_completion} startCombat={startCombat}/>
                <MapIcon style={{left:"24%", bottom:"42%"}} location_img="Grotto.svg" location_id={"67Uyu2sPLm8dI7OsgKCd"} completion_map={character.world_completion} startCombat={startCombat}/>
                <MapIcon style={{left:"40%", bottom:"24%"}} location_img="Swamp.svg" location_id={"Petks536iahPkO5wWD2L"} completion_map={character.world_completion} startCombat={startCombat}/>
                <MapIcon style={{}} location_img="Walls.svg" location_id={"J6MvGJY9sdzZu9zD5JhA"} completion_map={character.world_completion} startCombat={startCombat}/>
                <MapIcon style={{left:"62%", bottom:"66%"}} location_img="Fortress.svg" location_id={"Rw4dI8JsQXkZiH7eFPqZ"} completion_map={character.world_completion} startCombat={startCombat}/>
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
        <CombatEncounter location_id={selectedLocation} endCombat={endCombat} completion_map={character.world_completion} setDeathMessage={setDeathMessage}/>
    )
  }

  return (
    <>
    {isDead && <DeathMessage setIsDead={setIsDead} deathMessage={deathMessage}/>}
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

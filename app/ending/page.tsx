"use client"

import { Character } from '@/classes/character'
import { User } from '@/classes/user'
import { useBoundStore } from '@/zustand/zustand'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {

  const user:User = useBoundStore((state:any) => state.user)
  const navigator = useRouter()
  const character:Character = useBoundStore((state:any) => state.character)
  const setCharacter = useBoundStore((state:any) => state.setCharacter)

  useEffect(() => {
    logicCheck()
  },[])

  function logicCheck() {
    if (!user.id) {
      navigator.push("/")
    }

    // Additional check to ensure the player has beaten the game
    if (character.world_completion && character.world_completion.length > 0) {
      const completionReference = character.world_completion.find((i) => i.id === "Rw4dI8JsQXkZiH7eFPqZ")?.progress || 0
      if (completionReference <= 0) {
        navigator.push("/")
      }
    }
    else {
      navigator.push("/")
    }
  }

  function resetGame() {
    const newCharacter = character.clone(character.id,character.world_completion)
    newCharacter.wins += 1
    newCharacter.world_completion = []
    setCharacter(newCharacter)
    navigator.push("/map")
  }

  return (
    <div className='container'>
      <div className="page">
        <div className="info__wrapper">
            <div className="character__header">Congratulations!</div>
            <div className="info__text">
                You beat the evil necromancer and squashed his dastardly plans to conquer the world with an undead army.
                <br/><br/>
                Unfortunately it seems that the necromancer is unkillable, and knocking his head off only made him angrier. 
                <br/><br/>
                As he places his skull back on his head, he summons a pair of skeletal guards who escort you back to the Village of Norm.
                <br/><br/>
                A purple beam of energy blasts into the sky from the fortress, causing all of the Necromancer’s minions to grow stronger. I guess 2nd time’s the charm right?
            </div>
            <div className="info__section">
                <button className='btn' onClick={resetGame}>Here we go again...</button>
            </div>
        </div>
      </div>
    </div>
  )
}

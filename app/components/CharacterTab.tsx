import { Character } from '@/classes/character'
import { User } from '@/classes/user'
import { useBoundStore } from '@/zustand/zustand'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CharacterTab() {

  const character:Character = useBoundStore((state:any) => state.character)
  const user:User = useBoundStore((state:any) => state.user)
  const setCharacter = useBoundStore((state:any) => state.setCharacter)
  const setUser = useBoundStore((state:any) => state.setUser)

  const navigator = useRouter()

  function getCharacterArt() {

    if (character.class === "Warrior") {
        return "warrior.svg"
    }
    else if (character.class === "Mage") {
        return "mage.svg"
    }
    else {
        return "ranger.svg"
    }
  }

  function calculateXPCost(value = 0) {
    return value * 15
  }

  function purchaseSkill(type = "", cost = 0) {

    // Check if we can afford it
    if (cost <= character.xp) {

        const newCharacter = character.clone(character.id,character.world_completion)
        newCharacter.xp -= cost

        // If so, remove the xp from our character and add a skill based on whatever we chose
        if (type === "muscle") {
            newCharacter.muscle += 1
        }
        else if (type === "magic") {
            newCharacter.magic += 1
        }
        else {
            newCharacter.moxie += 1
        }

        setCharacter(newCharacter)
    }
  }

  function quit() {

    // Jank solution, but prevents errors
    const newUser = new User("","","")
    newUser.id = null
    setUser(newUser)


    navigator.push("/")
  }

  return (
    <div className={`character__stats left-right ${!character.class && "hidden"}`}>
        <div className="character__info">
            <div className="character__portrait">
                <div className="box">
                    <Image width={50} height={50} src={`/classes/${getCharacterArt()}`} alt="character" />
                </div>
            </div>
            <div className="character__desc--wrapper">
                <div className="character__desc--username">{user.username || "Username Here"}</div>
                <div className="character__desc--class">{(character.class && character.getRank()) || "Class"}</div>
            </div>
        </div>
        <div className="character__info">
            <div className="character__core">
                HP: {character.hp || 0}/{character.class && character.getLevel() || 0} XP: {character.xp || 0}
            </div>
        </div>
        <div className="character__skills">
            <div className="skill__wrapper" onClick={() => purchaseSkill("muscle",calculateXPCost(character.muscle || 0))}>
                <div className="skill__name">Muscle: {character.muscle || 0}</div>
                <div className="skill__cost">{calculateXPCost(character.muscle || 0)} XP</div>
                <div className="skill__button">+</div>
            </div>
            <div className="skill__wrapper" onClick={() => purchaseSkill("magic",calculateXPCost(character.magic || 0))}>
                <div className="skill__name">Magic: {character.magic || 0}</div>
                <div className="skill__cost">{calculateXPCost(character.magic || 0)} XP</div>
                <div className="skill__button">+</div>
            </div>
            <div className="skill__wrapper" onClick={() => purchaseSkill("moxie",calculateXPCost(character.moxie || 0))}>
                <div className="skill__name">Moxie: {character.moxie || 0}</div>
                <div className="skill__cost">{calculateXPCost(character.moxie || 0)} XP</div>
                <div className="skill__button">+</div>
            </div>
        </div>
        <div className="btn" onClick={quit}>quit</div>
        <div className="btn red">delete account</div>
        </div>
  )
}

import { Character } from '@/classes/character'
import { User } from '@/classes/user'
import { useBoundStore } from '@/zustand/zustand'
import Image from 'next/image'
import React from 'react'

export default function CharacterTab() {

  const character:Character = useBoundStore((state:any) => state.character)
  const user:User = useBoundStore((state:any) => state.user)

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

  return (
    <div className="character__stats">
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
                HP: {character.hp || 0}/{character.hp || 0}
                XP: {character.xp || 0}
            </div>
        </div>
        <div className="character__skills">
            <div className="skill__wrapper">
                <div className="skill__name">Muscle: {character.muscle || 0}</div>
                <div className="skill__cost">200 XP</div>
                <div className="skill__button">+</div>
            </div>
            <div className="skill__wrapper">
                <div className="skill__name">Magic: {character.magic || 0}</div>
                <div className="skill__cost">200 XP</div>
                <div className="skill__button">+</div>
            </div>
            <div className="skill__wrapper">
                <div className="skill__name">Moxie: {character.moxie || 0}</div>
                <div className="skill__cost">200 XP</div>
                <div className="skill__button">+</div>
            </div>
        </div>
        <div className="btn">quit</div>
        <div className="btn red">delete account</div>
        </div>
  )
}

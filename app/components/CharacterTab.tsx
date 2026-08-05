import Image from 'next/image'
import React from 'react'

export default function CharacterTab() {
  return (
    <div className="character__stats">
        <div className="character__info">
            <div className="character__portrait">
                <div className="box">
                    <Image width={50} height={50} src={`/classes/warrior.svg`} alt="character" />
                </div>
            </div>
            <div className="character__desc--wrapper">
                <div className="character__desc--username">Username Here</div>
                <div className="character__desc--class">Novice Class</div>
            </div>
        </div>
        <div className="character__info">
            <div className="character__core">
                HP: 126/126
                XP: 2013
            </div>
        </div>
        <div className="character__skills">
            <div className="skill__wrapper">
                <div className="skill__name">Muscle: 2</div>
                <div className="skill__cost">200 XP</div>
                <div className="skill__button">+</div>
            </div>
            <div className="skill__wrapper">
                <div className="skill__name">Magic: 2</div>
                <div className="skill__cost">200 XP</div>
                <div className="skill__button">+</div>
            </div>
            <div className="skill__wrapper">
                <div className="skill__name">Moxie: 2</div>
                <div className="skill__cost">200 XP</div>
                <div className="skill__button">+</div>
            </div>
        </div>
        <div className="btn">quit</div>
        <div className="btn red">delete account</div>
        </div>
  )
}

import Image from 'next/image'
import React from 'react'
import MapIcon from './MapIcon'

export default function page() {
  return (
    <>
    <div className='map__header'>
        <div className="map__header__text">dungeon diver.</div>
    </div>
    <div className='map__wrapper'>
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
    </div>
    </>
  )
}

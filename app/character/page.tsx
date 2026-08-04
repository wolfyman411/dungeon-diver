import React from 'react'
import ClassButton from './ClassButton'

export default function page() {
  return (
    <div className='container'>
      <div className="page">
        <div className="character__wrapper">
            <div className="character__section">
                <div className="character__header">Pick a class.</div>
                <div className="class__wrapper">
                    <ClassButton className={'Warrior'} classIcon={'warrior.svg'} classDesc={<>Use <span className='red'>muscle</span> to hit your enemies with your <span className='blue'>sword</span>.</>}/>
                    <ClassButton className={'Mage'} classIcon={'mage.svg'} classDesc={<>Use <span className='red'>magic</span> to hit your enemies with your <span className='blue'>spells</span>.</>}/>
                    <ClassButton className={'Ranger'} classIcon={'ranger.svg'} classDesc={<>Use <span className='red'>moxie</span> to hit your enemies with your <span className='blue'>slingshot</span>.</>}/>
                </div>
            </div>
            <div className="character__section">
                <div className="character__header">Enter the world.</div>
                <button className='btn'>Play</button>
            </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { User } from '@/classes/user'
import { useBoundStore } from '@/zustand/zustand'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {

  const user:User = useBoundStore((state:any) => state.user)
  const navigator = useRouter()

  useEffect(() => {
    logicCheck()
  },[])

  function logicCheck() {
    if (!user.id) {
        navigator.push("/")
    }
  }

  return (
    <div className='container'>
      <div className="page">
        <div className="info__wrapper">
            <div className="character__header">About this quest.</div>
            <div className="info__text">
                You are about to embark on a quest to destroy the dark necromancer!
                <br/><br/>
                Before you are able to get to him, you must first fight your way to his Dark Fortress, and get through his minions.
                <br/><br/>
                Each time a minion is slain or you are defeated, you’ll gain <span className='red'>XP</span> which you can use to level up your 3 stats.
                <br/><br/>
                <span className='red'>Muscle</span>: Defense against melee damage.
                <br/>
                <span className='red'>Magic</span>: Defense against magical damage.
                <br/>
                <span className='red'>Moxie</span>: Defense against ranged damage.
                <br/><br/>
                Get strong enough and defeat the evil necromancer! Good Luck! 
            </div>
            <div className="info__section">
                <button className='btn'>I'm Ready!</button>
            </div>
        </div>
      </div>
    </div>
  )
}

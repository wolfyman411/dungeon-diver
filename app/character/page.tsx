"use client"

import React, { useEffect, useRef, useState } from 'react'
import ClassButton from './ClassButton'
import { User } from '@/classes/user';
import { Character } from '@/classes/character';
import { useBoundStore } from '@/zustand/zustand';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default function page() {

  const classWrapperRef = useRef<HTMLDivElement|null>(null);
  
  const [errorMessage,setErrorMessage] = useState("")
  const [chosenClass,setChosenClass] = useState("")

  const user:User = useBoundStore((state:any) => state.user)
  const character:Character = useBoundStore((state:any) => state.character)
  const setCharacter = useBoundStore((state:any) => state.setCharacter)
  
  const navigator = useRouter()

  useEffect(() => {
    logicCheck()
  },[user,character])

  function logicCheck() {
    if (!user.id) {
        navigator.push("/")
    }

    if (character.class !== "") {
        navigator.push("/map")
    }
  }
  

  function updateSelection(selectedClass="") {

    console.log(selectedClass)

    if (classWrapperRef.current === null) {
      return
    }

    for (const item of Array.from(classWrapperRef.current.children)) {
      item.classList.remove("selected")
    }

    let ref:HTMLElement|undefined

    if (selectedClass === "Warrior") {
      ref = classWrapperRef.current?.children[0] as HTMLElement | undefined
    }
    else if (selectedClass === "Mage") {
      ref = classWrapperRef.current?.children[1] as HTMLElement | undefined
    }
    else if (selectedClass === "Ranger") {
      ref = classWrapperRef.current?.children[2] as HTMLElement | undefined
    }

    if (ref) {
      ref.classList.add("selected")
    }

    setChosenClass(selectedClass)
  }

  async function beginGame() {
    if (chosenClass === "") {
      setErrorMessage("Please select a class.")
      return
    }
    else {

      try {

        const newCharacter = character
        newCharacter.class = chosenClass
        newCharacter.muscle = 1
        newCharacter.magic = 1
        newCharacter.moxie = 1
        newCharacter.hp = 5

        if (chosenClass=== "Warrior") {
          newCharacter.muscle = 3
        }
        else if (chosenClass=== "Mage") {
          newCharacter.magic = 3
        }
        else if (chosenClass=== "Ranger") {
          newCharacter.moxie = 3
        }

        setCharacter(newCharacter)
        const docRef = doc(db,"character",character.id)
        setDoc(docRef,{class:chosenClass, muscle:newCharacter.muscle, magic:newCharacter.magic, moxie:newCharacter.moxie, hp:newCharacter.hp}, {merge:true})

        navigator.push("/map")

      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className='container'>
      <div className="page">
        <div className="character__wrapper">
            <div className="character__section">
                <div className="character__header">Pick a class.</div>
                <div className="class__wrapper" ref={classWrapperRef}>
                    <ClassButton className={'Warrior'} classIcon={'warrior.svg'} classDesc={<>Use <span className='red'>muscle</span> to hit your enemies with your <span className='blue'>sword</span>.</>} updateSelection={updateSelection}/>
                    <ClassButton className={'Mage'} classIcon={'mage.svg'} classDesc={<>Use <span className='red'>magic</span> to hit your enemies with your <span className='blue'>spells</span>.</>} updateSelection={updateSelection}/>
                    <ClassButton className={'Ranger'} classIcon={'ranger.svg'} classDesc={<>Use <span className='red'>moxie</span> to hit your enemies with your <span className='blue'>slingshot</span>.</>} updateSelection={updateSelection}/>
                </div>
                <div style={{paddingTop:24}} className='red'>{errorMessage}</div>
            </div>
            <div className="character__section">
                <div className="character__header">Enter the world.</div>
                <button className='btn' onClick={beginGame}>Play</button>
            </div>
        </div>
      </div>
    </div>
  )
}

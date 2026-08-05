"use client"

import React, { useRef, useState } from 'react'
import ClassButton from './ClassButton'

export default function page() {

  const classWrapperRef = useRef<HTMLDivElement|null>(null);
  
  const [errorMessage,setErrorMessage] = useState("")
  const [chosenClass,setChosenClass] = useState("")

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

  function beginGame() {
    if (chosenClass === "") {
      setErrorMessage("Please select a class.")
      return
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
                <button className='btn'>Play</button>
            </div>
        </div>
      </div>
    </div>
  )
}

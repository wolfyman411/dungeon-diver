import React from 'react'

interface props {
    setIsDead: (param:any) => void,
    deathMessage: string
}

export default function DeathMessage({setIsDead, deathMessage}:props) {
  return (
    <div className='death-message__wrapper'>
      <div className="death-message__box">
        <div className="death__title">Ouch!</div>
        <div className="death__text">{deathMessage}</div>
        <div className="btn" onClick={() => setIsDead(false)}>Pick yourself up</div>
      </div>
    </div>
  )
}

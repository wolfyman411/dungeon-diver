import React from 'react'

export default function page() {
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
                <button className='btn'>Here we go again...</button>
            </div>
        </div>
      </div>
    </div>
  )
}

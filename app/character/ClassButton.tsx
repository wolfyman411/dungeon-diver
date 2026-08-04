import Image from 'next/image'
import React from 'react'

export default function ClassButton({className = "", classIcon = "", classDesc = <div></div>}) {
  return (
    <div className='class__button--wrapper'>
        <div className="class__name">{className}</div>
        <div className="box">
            <Image width={50} height={50} src={`/classes/${classIcon}`} alt={className} />
        </div>
        <div className="class__desc">{classDesc}</div>
    </div>
  )
}
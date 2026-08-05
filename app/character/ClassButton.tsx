import Image from 'next/image'
import React from 'react'

export default function ClassButton({className = "",classIcon = "",classDesc = <div></div>,updateSelection = () => {}}: {
  className?: string; classIcon?: string; classDesc?: React.ReactNode; updateSelection?: (className: string) => void}) {
  return (
    <div className='class__button--wrapper' onClick={() => updateSelection(className)}>
        <div className="class__name">{className}</div>
        <div className="box">
            <Image width={50} height={50} src={`/classes/${classIcon}`} alt={className} />
        </div>
        <div className="class__desc">{classDesc}</div>
    </div>
  )
}
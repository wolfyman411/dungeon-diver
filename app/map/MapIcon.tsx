import Image from 'next/image'
import React from 'react'

export default function MapIcon({location_name = "", challenge_progress = 0, challenges = 10, icon ="", accessible = true, style={}}) {

  function getDisplay() {
    if (accessible) {
        if (challenge_progress >= challenges) {
            return "[Completed]"
        }
        else {
            return "[Uncompleted]"
        }
    }
    else {
        return "[Inaccessible]"
    }
  }

  return (
    <div className='map__icon--wrapper' style={style}>
      <img src={`/mapicons/${icon}`} alt={location_name} />
      <div className="map__text">{location_name}</div>
      <div className="map__text">{getDisplay()}</div>
      <div className="map__text">{challenge_progress}/{challenges}</div>
    </div>
  )
}

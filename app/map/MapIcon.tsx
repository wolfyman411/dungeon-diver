import { db } from '@/firebase/firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type Props = {
  location_img?: string
  location_id?: string
  style?: React.CSSProperties
  progress?: number
}

type LocalLocation = {
  location_name: string
  challenges: number
  required_locations: string[]
}

export default function MapIcon({ location_img = "", location_id = '', style = {}, progress = 0 }: Props) {

  const [locationData, setLocationData] = useState<LocalLocation>({
    location_name: 'Unknown',
    challenges: 1,
    required_locations: []
  })

  const [accessible,setAccessible] = useState(true)


  useEffect(() => {
    getLocationData()
  },[])


  async function getLocationData() {

    try {
      const docRef = doc(db,"locations",location_id)
      const docData = (await getDoc(docRef)).data()

      if (!docData) {
        return
      }

      setLocationData({
        location_name: docData.location_name,
        challenges: docData.challenges,
        required_locations: docData.required_locations
      })
    } catch (e) {
      console.log(e)
    }
  }

  function getDisplay() {
    if (accessible) return '[Inaccessible]'
    return progress >= locationData.challenges ? '[Completed]' : '[Uncompleted]'
  }

  return (
    <div className='map__icon--wrapper' style={style}>
      <img src={`/mapicons/${location_img}`} alt={locationData.location_name || ""} />
      <div className="map__text">{locationData.location_name || ""}</div>
      <div className="map__text">{getDisplay()}</div>
      <div className="map__text">{progress}/{locationData.challenges || ""}</div>
    </div>
  )
}

import { db } from '@/firebase/firebase'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type LocalLocation = {
  location_name: string
  challenges: number
  required_locations: string[]
}

export default function MapIcon({ location_img = "", location_id = '', style = {}, completion_map = [] }) {

  const [locationData, setLocationData] = useState<LocalLocation>({
    location_name: 'Unknown',
    challenges: 1,
    required_locations: []
  })

  const [accessible,setAccessible] = useState(true)
  const [progress,setProgress] = useState(0)

  useEffect(() => {
    getProgress()
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

  function getProgress() {
    const locationCompletion = completion_map.find((item: { id: string; progress: number }) => item.id === location_id) || 0
    setProgress(locationCompletion)
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

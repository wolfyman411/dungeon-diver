import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type Props = {
  location_img: string,
  location_id: string,
  style: React.CSSProperties,
  completion_map: Array<{id: string, progress: number}>,
  startCombat: (param:any) => void
}

type LocalLocation = {
  location_name: string
  challenges: number
  required_locations: string[]
}

export default function MapIcon({ location_img = "", location_id = '', style = {}, completion_map = [], startCombat}:Props) {

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

  useEffect(() => {
    updateAccessible()
  },[locationData.required_locations])

  // Check if neighbors are beaten, if not make this inaccessible
  async function updateAccessible() {

    // If there are no required locations, then set it to true always
    if (locationData.required_locations.length <= 0) {
      setAccessible(true)
      return
    }

    for (const item of locationData.required_locations) {
      const docRef = doc(db,"locations",item)
      const docData = (await getDoc(docRef)).data()

      if (!docData) {
        continue
      }

      const completionReference = completion_map.find((i) => i.id === item)?.progress || 0
      // If at least one is beaten, then it may pass
      if (completionReference >= docData.challenges) {
        setAccessible(true)
        return
      }
    }
    setAccessible(false)
  }

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
    const locationCompletion = completion_map.find((item) => item.id === location_id)?.progress || 0
    setProgress(locationCompletion)
  }

  function getDisplay() {
    if (!accessible) return '[Inaccessible]'
    return progress >= locationData.challenges ? '[Completed]' : '[Uncompleted]'
  }

  return (
    <div className={`map__icon--wrapper ${!accessible && "inaccessible"}`} style={style} onClick={() => accessible && (startCombat(location_id))}>
      <img src={`/mapicons/${location_img}`} alt={locationData.location_name || ""} />
      <div className="map__text">{locationData.location_name || ""}</div>
      <div className="map__text">{getDisplay()}</div>
      <div className="map__text">{progress}/{locationData.challenges || ""}</div>
    </div>
  )
}

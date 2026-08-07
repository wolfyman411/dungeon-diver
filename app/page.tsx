"use client";
import { Character } from "@/classes/character";
import { User } from "@/classes/user";
import { db } from "@/firebase/firebase";
import { useBoundStore } from "@/zustand/zustand";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const slider = useRef<HTMLDivElement|null>(null)

  const setUser = useBoundStore((state:any) => state.setUser)
  const setCharacter = useBoundStore((state:any) => state.setCharacter)

  const navigator = useRouter()

  useEffect(() => {
  }, []);

  async function checkUsers() {

    setErrorMessage("")

    if (username.trim().length <= 0 || password.trim().length <= 0) {
      setErrorMessage("Please fill out both the username and password!")
      return
    }

    try {
      const usersRef = collection(db,"users")
      const q = query(usersRef, where("username", "==", username))
      const querySnapshot = await getDocs(q)

      // Log In
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        const userData = userDoc.data()

        if (userData.password === password) {

          setUserInfo(userDoc.id,password,username,userData.character_id)
          setCharacterInfo(userData.character_id)

          slider.current?.classList.add("slide-out")
          setTimeout(() => {
            navigator.push("/map")
          },1000)
        } else {
          setErrorMessage("Login failed.")
        }
      }

      // Sign Up
      else {
        try {

          const characterRef = await addDoc(collection(db,"character"), {
            class: "",
            hp: "",
            magic:0,
            moxie:0,
            muscle:0,
            wins:0,
            xp:0,
          })

          const user = await addDoc(collection(db,"users"), {
            username: username,
            password: password,
            character_id:characterRef.id
          })

          setUserInfo(user.id,password,username,characterRef.id)
          setCharacterInfo(characterRef.id)
          
          slider.current?.classList.add("slide-out")
          setTimeout(() => {
            navigator.push("/character")
          },1000)
        }
        catch (e) {
          setErrorMessage("Sign up failed.")
        }
      }

    } catch (e) {
      console.log(e)
    }
  }

  function setUserInfo(id:string,password:string,username:string,character_id:string) {
    const newUser = new User(password,username,character_id)
    newUser.id = id
    setUser(newUser)
  }

  async function setCharacterInfo(character_id:string) {
    const userRef = doc(db,"character",character_id)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      const characterData = docSnap.data()
      const newCharacter = new Character(characterData.class,characterData.hp,characterData.magic,characterData.moxie,characterData.muscle,characterData.wins,characterData.xp)
      newCharacter.id = character_id
      newCharacter.world_completion = characterData.world_completion
      setCharacter(newCharacter)
    }
    else {
      console.log("issue locating character!")
    }
  }

  return (
    <div className="container">
      <div className="login__wrapper fade-in">
        <div ref={slider}>
          <div className="login__header">dungeon diver.</div>
          <div className="login__subtitle">log in / sign up</div>
          <form className="login__form--wrapper">
            <div className="login__error red">{errorMessage}</div>
            <input className="login__form--input" type="text" placeholder="username" autoComplete="current-username" onChange={(e) => setUsername(e.target.value)}/>
            <input className="login__form--input" type="password" placeholder="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
            <div className="btn" onClick={checkUsers}>play</div>
          </form>
        </div>
      </div>
    </div>
  );
}

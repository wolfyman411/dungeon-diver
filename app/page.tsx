"use client";
import { db } from "@/firebase/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

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
          navigator.push("/map")
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

          navigator.push("/character")
        }
        catch (e) {
          setErrorMessage("Sign up failed.")
        }
      }

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container">
      <div className="login__wrapper fade-in">
        <div className="login__header">dungeon diver.</div>
        <div className="login__subtitle">log in / sign up</div>
        <div className="login__form--wrapper">
          <div className="login__error red">{errorMessage}</div>
          <input className="login__form--input" type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <input className="login__form--input" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          <button className="btn" onClick={checkUsers}>play</button>
        </div>
      </div>
    </div>
  );
}

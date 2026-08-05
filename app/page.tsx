"use client";
import { Character } from "@/classes/character";
import { auth, db } from "@/firebase/firebase";
import { signInWithCredential, UserCredential } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

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

        try {
          const userCredential = await signInWithCredential(auth,{username,password})
        } catch (e) {
          setErrorMessage("Login failed.")
        }
      }

      // Sign Up
      else {
        try {
          const userCredential:UserCredential = null
          const user = userCredential.user
          const characterRef = await setDoc(doc(db,"character"), {
            character_id:user.uid,
            class: "",
            hp: "",
            magic:0,
            moxie:0,
            muscle:0,
            wins:0,
            xp:0,
          })

          await setDoc(doc(db,"users",user.uid), {
            username: username
          })
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

"use client";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
  }, []);

  return (
    <div className="container">
      <div className="login__wrapper fade-in">
        <div className="login__header">dungeon diver.</div>
        <div className="login__subtitle">log in / sign up</div>
        <div className="login__form--wrapper">
          <input className="login__form--input" type="text" placeholder="username" />
          <input className="login__form--input" type="password" placeholder="password" />
          <button className="btn">play</button>
        </div>
      </div>
    </div>
  );
}

import { User } from "@/classes/user";
import { create } from "zustand";

export const createUserSlice = (set:any) => ({
  user: {} as User,
  setUser: (newUser:User) => set({user:newUser})
})
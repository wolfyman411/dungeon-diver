import { Character } from "@/classes/character";
import { create } from "zustand";

export const createCharacterSlice = (set:any) => ({
  character: {} as Character,
  setCharacter: (newCharacter:Character) => set({character:newCharacter})
})
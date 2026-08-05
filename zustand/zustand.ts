import { create } from 'zustand'
import { createUserSlice } from './userSlice'
import { createCharacterSlice } from './characterSlice'

export const useBoundStore = create((a) => ({
  ...createUserSlice(a),
  ...createCharacterSlice(a),
}))
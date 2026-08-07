import { create } from 'zustand'
import { createUserSlice } from './userSlice'
import { createCharacterSlice } from './characterSlice'
import { persist } from 'zustand/middleware'

export const useBoundStore = create(
  persist(
    (a) => ({
      ...createUserSlice(a),
      ...createCharacterSlice(a),
    }),
    {
      name: 'bound-store',
      partialize: (state:any) => ({
        user: state.user,
        character: state.character,
      }),
    }
  )
)
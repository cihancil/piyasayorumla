import { create } from 'zustand'
import computed from "zustand-computed"

import ForexData from '@src/models/ForexData'

type FollowStore = {
  followedData: ForexData[],
  clearFollowedData: () => void,
  addData: (data: ForexData) => void,
  removeData: (data: ForexData) => void,
}

type ComputedStore = {
}

const computeState = (state: FollowStore): ComputedStore => ({

})

export const useFollowStore = create<FollowStore>()(
  computed(
    (set) => ({
      followedData: [],
      clearFollowedData: () => {
        set({ followedData: [] })
      },
      addData: (data: ForexData) => {
        set((state) => {
          const found = state.followedData.find(fd => fd.name == data.name)
          // if (!!found) {
          //   return {}
          // }
          return { followedData: [...state.followedData, data] }
        })
      },
      removeData: (data: ForexData) => {
        set((state) => {
          const remaining = [...state.followedData.filter(fd => fd.name != data.name)]
          return { followedData: remaining }
        })
      },
    }), computeState)
)


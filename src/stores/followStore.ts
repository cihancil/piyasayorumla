import { create } from 'zustand'
import computed from "zustand-computed"

import ForexData from '@src/models/ForexData'
import { setFollowedDataStorage, getFollowedDataStorage } from '@src/utils/storage'

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
      followedData: getFollowedDataStorage(),
      clearFollowedData: () => {
        setFollowedDataStorage([])
        set({ followedData: [] })
      },
      addData: (data: ForexData) => {
        set((state) => {
          const found = state.followedData.find(fd => fd.name == data.name)
          if (!!found) {
            return {}
          }
          const followedData = [...state.followedData, data]
          setFollowedDataStorage(followedData)
          return { followedData: followedData }
        })
      },
      removeData: (data: ForexData) => {
        set((state) => {
          const remaining = [...state.followedData.filter(fd => fd.name != data.name)]
          setFollowedDataStorage(remaining)
          return { followedData: remaining }
        })
      },
    }), computeState)
)

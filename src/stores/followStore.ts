import { create } from 'zustand'
import computed from "zustand-computed"

import ForexData from '@src/models/ForexData'
import {
  setFollowedDataStorage, getFollowedDataStorage, getInitialDataPopulated, setInitialDataPopulated,
} from '@src/utils/storage'

type FollowStore = {
  followedDataNames: string[],
  clearFollowedData: () => void,
  addData: (data: ForexData) => void,
  removeData: (data: ForexData) => void,
  setAllData: (followedData: string[]) => void,
  setInitialData: (allData: ForexData[]) => void,
}

type ComputedStore = {
}

const computeState = (state: FollowStore): ComputedStore => ({

})

export const useFollowStore = create<FollowStore>()(
  computed(
    (set) => ({
      followedDataNames: getFollowedDataStorage(),
      clearFollowedData: () => {
        setFollowedDataStorage([])
        set({ followedDataNames: [] })
      },
      addData: (data: ForexData) => {
        set((state) => {
          const found = state.followedDataNames.find(fd => fd == data.name)
          if (!!found) {
            return {}
          }
          const followedDataNames = [...state.followedDataNames, data.name]
          setFollowedDataStorage(followedDataNames)
          return { followedDataNames: followedDataNames }
        })
      },
      removeData: (data: ForexData) => {
        set((state) => {
          const remaining = [...state.followedDataNames.filter(fd => fd != data.name)]
          setFollowedDataStorage(remaining)
          return { followedDataNames: remaining }
        })
      },
      setAllData: (followedDataNames: string[]) => {
        set((state) => {
          setFollowedDataStorage(followedDataNames)
          return { followedDataNames: followedDataNames }
        })
      },
      setInitialData: () => {
        set((state) => {
          const populated = getInitialDataPopulated()
          if (populated) return {}
          if (state.followedDataNames.length != 0) return {}
          const initialNames = ['USD', 'EUR', 'GBP', 'Gram Altın', 'Ons Altın', 'BIST 100']
          setFollowedDataStorage(initialNames)
          setInitialDataPopulated()
          return { followedDataNames: initialNames }
        })
      },
    }), computeState)
)


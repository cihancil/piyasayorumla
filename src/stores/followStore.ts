import { create } from 'zustand'
import computed from "zustand-computed"

import ForexData from '@src/models/ForexData'
import {
  setFollowedDataStorage, getFollowedDataStorage, getInitialDataPopulated, setInitialDataPopulated,
} from '@src/utils/storage'
import MetaData from '@src/models/MetaData'

type FollowStore = {
  followedDataKeys: string[],
  clearFollowedData: () => void,
  addDataKey: (key: string) => void,
  removeDataKey: (key: string) => void,
  setAllDataKeys: (keys: string[]) => void,
  setInitialData: (allData: ForexData[]) => void,
}

type ComputedStore = {
}

const computeState = (state: FollowStore): ComputedStore => ({

})

export const useFollowStore = create<FollowStore>()(
  computed(
    (set) => ({
      followedDataKeys: getFollowedDataStorage(),
      clearFollowedData: () => {
        setFollowedDataStorage([])
        set({ followedDataKeys: [] })
      },
      addDataKey: (key: string) => {
        set((state) => {
          const found = state.followedDataKeys.find(fdk => fdk == key)
          if (!!found) {
            return {}
          }
          const followedDataKeys = [...state.followedDataKeys, key]
          setFollowedDataStorage(followedDataKeys)
          return { followedDataKeys: followedDataKeys }
        })
      },
      removeDataKey: (key: string) => {
        set((state) => {
          const remaining = [...state.followedDataKeys.filter(fdk => fdk != key)]
          setFollowedDataStorage(remaining)
          return { followedDataKeys: remaining }
        })
      },
      setAllDataKeys: (keys: string[]) => {
        set((state) => {
          setFollowedDataStorage(keys)
          return { followedDataKeys: keys }
        })
      },
      setInitialData: () => {
        set((state) => {
          const populated = getInitialDataPopulated()
          if (populated) return {}
          if (state.followedDataKeys.length != 0) return {}
          const initialKeys = ['USD', 'EUR', 'GBP']
          setFollowedDataStorage(initialKeys)
          setInitialDataPopulated()
          return { followedDataKeys: initialKeys }
        })
      },
    }), computeState)
)


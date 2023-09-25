import { create } from 'zustand'
import computed from "zustand-computed"
// import functions from '@react-native-firebase/functions'

import ForexData from '@src/models/ForexData'

type HistoryStore = {
  daily: string[],
  // weekly: string[],
  // monthly: string[],
  fetchDaily: (forexData: ForexData) => void,
}

type ComputedStore = {
}

const computeState = (state: HistoryStore): ComputedStore => ({

})

export const useHistoryStore = create<HistoryStore>()(
  computed(
    (set) => ({
      daily: [],
      fetchDaily: async (forexData: ForexData) => {


      },
    }), computeState)
)


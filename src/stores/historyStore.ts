import { create } from 'zustand'
import computed from "zustand-computed"
import { firebase } from '@react-native-firebase/functions'

import ForexData, { DataType } from '@src/models/ForexData'

const FUNCTION_REGION = 'europe-west1'

type HistoryStore = {
  dailyHistoryData: any[],
  // weekly: string[],
  // monthly: string[],
  isFetching: boolean,
  fetchHistory: (forexData: ForexData) => void,
}

type ComputedStore = {
}

const computeState = (state: HistoryStore): ComputedStore => ({

})

export const useHistoryStore = create<HistoryStore>()(
  computed(
    (set) => ({
      dailyHistoryData: [],
      isFetching: false,
      fetchHistory: async (forexData: ForexData) => {
        console.log('fetchHistory', forexData)
        if (!forexData) return {}
        try {
          set({ isFetching: true })
          if (!forexData.endpoint) return {}
          firebase.app().functions(FUNCTION_REGION).useEmulator('localhost', 5001)
          const response = await firebase.app().functions(FUNCTION_REGION).httpsCallable('historyCall')({
            name: forexData.endpoint,
            type: forexData.type,
          })
          console.log('response', response.data)
          set({ dailyHistoryData: response.data, isFetching: false })
        } catch (error) {
          console.log('ERROR', error)
          set({ isFetching: false })
        }
        return {}
      },
    }), computeState)
)


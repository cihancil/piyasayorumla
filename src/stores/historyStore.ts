import { create } from 'zustand'
import computed from "zustand-computed"
import { firebase } from '@react-native-firebase/functions'

import ForexData from '@src/models/ForexData'

const FUNCTION_REGION = 'europe-west1'

type HistoryStore = {
  dailyHistoryData: any[],
  monthlyHistoryData: any[],
  yearlyHistoryData: any[],
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
      monthlyHistoryData: [],
      yearlyHistoryData: [],
      isFetching: false,
      fetchHistory: async (forexData: ForexData) => {
        if (!forexData) return {}
        try {
          set({
            isFetching: true,
            dailyHistoryData: [],
            monthlyHistoryData: [],
            yearlyHistoryData: [],
          })
          let param = forexData.key
          // if (forexData.type == DataType.gold) {
          //   param = forexData.endpoint
          // } else if (forexData.name == 'BIST 100') {
          //   param = 'XU100'
          // } else {
          //   param = forexData.name
          // }

          if (!param) return {}
          firebase.app().functions(FUNCTION_REGION).useEmulator('localhost', 5001)
          const response = await firebase.app().functions(FUNCTION_REGION).httpsCallable('historyCall')({
            name: param,
          })
          const { daily, monthly, yearly } = response.data
          set({
            dailyHistoryData: daily,
            monthlyHistoryData: monthly,
            yearlyHistoryData: yearly,
            isFetching: false,
          })
        } catch (error) {
          console.log('ERROR', error)
          set({ isFetching: false })
        }
        return {}
      },
    }), computeState)
)


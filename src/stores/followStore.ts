import { create } from 'zustand'
import computed from "zustand-computed"

import ForexData from '@src/models/ForexData'
import {
  setFollowedDataStorage, getFollowedDataStorage, getInitialDataPopulated, setInitialDataPopulated,
} from '@src/utils/storage'
import { firebase } from '@react-native-firebase/functions'
import { getMetaDataType } from '@src/models/MetaData'

const FUNCTION_REGION = 'europe-west1'

type FollowStore = {
  followedDataKeys: string[],
  clearFollowedData: () => void,
  addDataKey: (key: string) => void,
  removeDataKey: (key: string) => void,
  setAllDataKeys: (keys: string[]) => void,
  setInitialData: () => void,
  fetchData: () => Promise<void>,
  followedDataKV: { [key: string]: ForexData },
}

type ComputedStore = {
  followedDataItems: ForexData[]
}

const computeState = (state: FollowStore): ComputedStore => {
  const followedDataItems = state.followedDataKeys
    .filter(k => {
      return state.followedDataKV[k] != undefined
    })
    .map(k => {
      console.log('computeState', k, state.followedDataKV)
      return state.followedDataKV[k]
    })
  return { followedDataItems: followedDataItems }
}

export const useFollowStore = create<FollowStore>()(
  computed(
    (set, get) => ({
      followedDataKV: {},
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
      fetchData: async () => {
        console.log('-----fetchData', get().followedDataKeys)
        firebase.app().functions(FUNCTION_REGION).useEmulator('localhost', 5001)
        const response = await firebase.app().functions(FUNCTION_REGION).httpsCallable('liveDataCall')({
          keys: get().followedDataKeys,
        })
        const data = response.data
        const allForexData = data.map((d: any) => {
          return {
            key: d.asset_key,
            type: getMetaDataType(d.asset_type),
            fullName: d.full_name,
            name: d.name,
            source: d.source_name,
            image: d.image,
            /////////////
            ask: d.ask,
            askStr: d.ask_str,
            bid: d.bid,
            bidStr: d.bid_str,
            latestValueStr: d.latest_value_str,
            changeAmountStr: d.change_amount_str,
            changeRate: d.change_rate,
            changeRateStr: d.change_rate_str,
            monthlyChangeAmountStr: d.monthly_amount_str,
            monthlyChangeRate: d.monthly_change_rate,
            monthlyChangeRateStr: d.monthly_change_rate_str,
            yearlyChangeAmountStr: d.yearly_amount_str,
            yearlyChangeRate: d.yearly_change_rate,
            yearlyChangeRateStr: d.yearly_change_rate_str,
          }
        })
        const followedDataKV: { [key: string]: ForexData } = {}
        allForexData.forEach((fd: ForexData) => {
          followedDataKV[fd.key] = fd
        })
        console.log('-----fetchData DONE',)
        set({ followedDataKV: followedDataKV })
      },
    }), computeState)
)


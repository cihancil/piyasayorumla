import { create } from 'zustand'
import computed from "zustand-computed"
import firestore from '@react-native-firebase/firestore'

import ForexData, { DataType } from '@src/models/ForexData'
import { TRtoEN } from '@src/utils/helpers'

type DataStore = {
  currencies: ForexData[],
  golds: ForexData[],
  exchanges: ForexData[],
  fetchData: () => Promise<void>,
  setSearchLabel: (search: string) => void,
  searchLabel: string,
}

type ComputedStore = {
  searchedData: ForexData[],
}


const computeState = (state: DataStore): ComputedStore => {
  const searchTerm = TRtoEN(state.searchLabel.toLowerCase())
  const data = [...state.currencies, ...state.golds, ...state.exchanges]
    .filter(fd =>
      (TRtoEN(fd.name.toLowerCase()).indexOf(searchTerm) != -1)
      ||
      (fd.fullName && TRtoEN(fd.fullName!.toLowerCase()).indexOf(searchTerm) != -1)
    )
  return {
    searchedData: data
  }
}

export const useDataStore = create<DataStore>()(
  computed(
    (set) => ({
      currencies: [],
      golds: [],
      exchanges: [],
      searchLabel: '',
      fetchData: async () => {
        const dovizapiSnapshot = await firestore().collection('dovizapi').get()
        let currencies: ForexData[] = [], golds: ForexData[] = [], exchanges: ForexData[] = []
        dovizapiSnapshot.forEach(doc => {
          const docId = doc.id
          const docData = doc.data()
          if (docId == 'kur') {
            currencies = Object.values(docData)
            currencies.forEach(c => {
              c.type = DataType.kur
            })
          }
          if (docId == 'gold') {
            golds = Object.values(docData)
            golds.forEach(g => {
              g.type = DataType.gold
            })
          }
          if (docId == 'borsa') {
            exchanges = Object.values(docData)
            exchanges.forEach(e => {
              e.type = DataType.borsa
            })
          }
        })
        set({ currencies: currencies, golds: golds, exchanges: exchanges })
      },
      setSearchLabel: (search: string) => {
        set({ searchLabel: search })
      },
    }), computeState)
)


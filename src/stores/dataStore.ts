import { create } from 'zustand'
import firestore from '@react-native-firebase/firestore'

import ForexData from '@src/models/ForexData'

type DataStore = {
  currencies: ForexData[],
  golds: ForexData[],
  exchanges: ForexData[],
  fetchData: () => {}
}

export const useDataStore = create<DataStore>((set) => ({
  currencies: [],
  golds: [],
  exchanges: [],
  fetchData: async () => {
    const dovizapiSnapshot = await firestore().collection('dovizapi').get()
    let currencies, golds, exchanges
    dovizapiSnapshot.forEach(doc => {
      const docId = doc.id
      const docData = doc.data()
      if (docId == 'kur') {
        currencies = Object.values(docData)
      }
      if (docId == 'gold') {
        golds = Object.values(docData)
      }
      if (docId == 'borsa') {
        exchanges = Object.values(docData)
      }
    })
    set({ currencies: currencies, golds: golds, exchanges: exchanges })
  },
}))
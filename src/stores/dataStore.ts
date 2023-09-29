import { create } from 'zustand'
import computed from "zustand-computed"
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

// import ForexData, { DataType } from '@src/models/ForexData'
import MetaData, { DataType } from '@src/models/MetaData'
import { TRtoEN } from '@src/utils/helpers'

type DataStore = {
  // fetchData: () => Promise<void>,
  fetchMeta: () => Promise<void>,
  setSearchLabel: (search: string) => void,
  searchLabel: string,
  metadata: MetaData[],
}

type ComputedStore = {
  searchedMetaData: MetaData[],
}


const computeState = (state: DataStore): ComputedStore => {
  const searchTerm = TRtoEN(state.searchLabel.toLowerCase())
  const searchedMetaData = state.metadata.filter(md =>
    (TRtoEN(md.name.toLowerCase()).indexOf(searchTerm) != -1)
    ||
    (TRtoEN(md.fullName!.toLowerCase()).indexOf(searchTerm) != -1)
    ||
    (TRtoEN(md.name.replaceAll('/', ' ').toLowerCase()).indexOf(searchTerm) != -1)
  )
  return {
    searchedMetaData: searchedMetaData
  }
}

export const useDataStore = create<DataStore>()(
  computed(
    (set) => ({
      metadata: [],
      searchLabel: '',
      fetchMeta: async () => {
        console.log('-----fetchMeta')
        const reference = storage().ref('meta.json')
        const downloadUrl = await reference.getDownloadURL()
        const metaResponse = await fetch(downloadUrl)
        const metaJson: MetaData[] = await metaResponse.json()
        const metadata = metaJson
          .filter((meta: MetaData) => {
            return meta.type == DataType.CUR || meta.type == DataType.GOLD || meta.type == DataType.PARITE || meta.type == DataType.IND || meta.type == DataType.STOCK
          })
          .filter((meta: MetaData) => {
            if (meta.type == DataType.CUR) {
              return meta.source == 'Serbest Piyasa'
            }
            return true
          })
          .sort((a, b) => {
            if (a.type == DataType.STOCK) return 1
            if (a.type == DataType.IND) {
              if (b.type == DataType.STOCK) return -1
              return 1
            }
            if (a.type == DataType.PARITE) {
              if (b.type == DataType.STOCK || b.type == DataType.IND) return -1
              return 1
            }
            if (a.type == DataType.GOLD) {
              if (b.type == DataType.STOCK || b.type == DataType.IND || b.type == DataType.PARITE) return -1
              return 1
            }
            if (a.type == DataType.CUR) return -1
            return 0
          })
        set({ metadata: metadata })
      },
      // fetchData: async () => {
      //   const dovizapiSnapshot = await firestore().collection('dovizapi').get()
      //   let currencies: ForexData[] = [], golds: ForexData[] = [], exchanges: ForexData[] = []
      //   dovizapiSnapshot.forEach(doc => {
      //     const docId = doc.id
      //     const docData = doc.data()
      //     if (docId == 'kur') {
      //       currencies = Object.values(docData)
      //       currencies.forEach(c => {
      //         c.type = DataType.kur
      //       })
      //     }
      //     if (docId == 'gold') {
      //       golds = Object.values(docData)
      //       golds.forEach(g => {
      //         g.type = DataType.gold
      //       })
      //     }
      //     if (docId == 'borsa') {
      //       exchanges = Object.values(docData)
      //       exchanges.forEach(e => {
      //         e.type = DataType.borsa
      //       })
      //     }
      //   })
      //   set({ currencies: currencies, golds: golds, exchanges: exchanges })
      // },
      setSearchLabel: (search: string) => {
        set({ searchLabel: search })
      },
    }), computeState)
)


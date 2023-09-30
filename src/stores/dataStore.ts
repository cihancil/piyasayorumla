import { create } from 'zustand'
import computed from "zustand-computed"
import storage from '@react-native-firebase/storage'
import { firebase } from '@react-native-firebase/functions'

import MetaData, { DataType } from '@src/models/MetaData'
import { TRtoEN } from '@src/utils/helpers'

const FUNCTION_REGION = 'europe-west1'

type DataStore = {
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
      setSearchLabel: (search: string) => {
        set({ searchLabel: search })
      },
    }), computeState)
)


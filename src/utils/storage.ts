import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const FOLLOWED_DATA = 'FOLLOWED_DATA'
const INITIAL_DATA_POPULATED = 'INITIAL_DATA_POPULATED'

export const setFollowedDataStorage = (followedData: string[]) => {
  storage.set(FOLLOWED_DATA, JSON.stringify(followedData))
}

export const getFollowedDataStorage = () => {
  const followedDataString = storage.getString(FOLLOWED_DATA)
  if (!followedDataString) return []
  const followedData = JSON.parse(followedDataString) as string[]
  return followedData
}

export const getInitialDataPopulated = () => {
  const initialDataPopulated = storage.getBoolean(INITIAL_DATA_POPULATED)
  return initialDataPopulated
}

export const setInitialDataPopulated = () => {
  storage.set(INITIAL_DATA_POPULATED, true)
}
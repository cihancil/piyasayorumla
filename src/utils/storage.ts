import ForexData from '@src/models/ForexData'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const FOLLOWED_DATA = 'FOLLOWED_DATA'

export const setFollowedDataStorage = (followedData: ForexData[]) => {
  storage.set(FOLLOWED_DATA, JSON.stringify(followedData))
}

export const getFollowedDataStorage = () => {
  const followedDataString = storage.getString(FOLLOWED_DATA)
  if (!followedDataString) return []
  const followedData = JSON.parse(followedDataString) as ForexData[]
  return followedData
}
import { useEffect, useState, useCallback } from 'react'
import {
  View, StyleSheet, FlatList, RefreshControl,
} from 'react-native'

import Colors from '@src/utils/colors'
import AppText from '@src/components/AppText'
import { useDataStore } from '@src/stores/dataStore'
import { useFollowStore } from '@src/stores/followStore'
import { useAuthStore } from '@src/stores/authStore'
import ForexDataListItem from '@src/components/ForexDataListItem'

export default () => {
  const followedData = useFollowStore((state) => state.followedData)

  const fetchData = useDataStore((state) => state.fetchData)
  const firebaseUser = useAuthStore((state) => state.firebaseUser)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (firebaseUser)
      fetchData()
  }, [firebaseUser])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchData()
    setTimeout(() => {
      setRefreshing(false)
    }, 300)
  }, [])

  return (
    <FlatList
      data={followedData}
      keyExtractor={item => item.name}
      renderItem={
        ({ item }) =>
          <ForexDataListItem
            data={item} key={item.name} style={styles.itemContainer} />
      }
      style={styles.container}
      refreshControl={< RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[Colors.darkBackground]}
        tintColor={Colors.white}
      />}
      indicatorStyle='white'
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  itemContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

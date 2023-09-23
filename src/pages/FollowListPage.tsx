import { useEffect, useState, useCallback } from 'react'
import {
  View, StyleSheet, ScrollView, RefreshControl,
} from 'react-native'

import Colors from '@src/utils/colors'
import AppText from '@src/components/AppText'
import { useDataStore } from '@src/stores/dataStore'
import { useAuthStore } from '@src/stores/authStore'
import ForexDataListItem from '@src/components/ForexDataListItem'

export default () => {
  const currencies = useDataStore((state) => state.currencies)
  const exchanges = useDataStore((state) => state.exchanges)
  const golds = useDataStore((state) => state.golds)

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
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[Colors.darkBackground]}
        tintColor={Colors.white}
      />}
      indicatorStyle='white'
    >
      {/* {[...currencies, ...golds, ...exchanges].map(e => <ForexDataListItem key={e.name} data={e} style={{
        padding: 8
      }} />)} */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  }
})
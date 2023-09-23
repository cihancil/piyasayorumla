import { useEffect, useState, useCallback } from 'react'
import {
  View, StyleSheet, FlatList, RefreshControl, TouchableOpacity
} from 'react-native'
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ReactNativeHapticFeedback from "react-native-haptic-feedback"

import Colors from '@src/utils/colors'
import AppText from '@src/components/AppText'
import { useDataStore } from '@src/stores/dataStore'
import { useFollowStore } from '@src/stores/followStore'
import { useAuthStore } from '@src/stores/authStore'
import ForexDataListItem from '@src/components/ForexDataListItem'
import ForexData from '@src/models/ForexData'
import colors from '@src/utils/colors'

export default () => {
  const followedData = useFollowStore((state) => state.followedData)
  const fetchData = useDataStore((state) => state.fetchData)
  const firebaseUser = useAuthStore((state) => state.firebaseUser)
  const removeData = useFollowStore((state) => state.removeData)
  const setAllData = useFollowStore((state) => state.setAllData)

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

  const renderItem = ({ item, drag, isActive }: RenderItemParams<ForexData>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          delayLongPress={100}
          onLongPress={() => {
            ReactNativeHapticFeedback.trigger("impactLight")
            drag()
          }}
          style={{ paddingLeft: 20 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <FontAwesome5 size={20} name='bars' color={colors.mediumGray} />
            <View style={{ width: 8 }} />
            <ForexDataListItem
              data={item} key={item.name} style={styles.itemContainer} />
            <TouchableOpacity style={{ paddingRight: 16, paddingLeft: 12 }} hitSlop={24} onPress={() => {
              removeData(item)
            }}>
              <FontAwesome5 size={16} color={colors.red} name={'minus-circle'} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }
  return (
    <DraggableFlatList
      data={followedData}
      onDragEnd={({ data }) => {
        setAllData(data)
      }}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      containerStyle={{ flex: 1 }}
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
    // flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  itemContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

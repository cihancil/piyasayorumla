import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  View, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Platform
} from 'react-native'
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ReactNativeHapticFeedback from "react-native-haptic-feedback"

import Colors from '@src/utils/colors'
import AppText from '@src/components/AppText'
import { useDataStore } from '@src/stores/dataStore'
import { useFollowStore } from '@src/stores/followStore'
import { useAuthStore } from '@src/stores/authStore'
import { useUIStore } from '@src/stores/uiStore'
import { createNativeWrapper } from 'react-native-gesture-handler'

import ForexDataListItem from '@src/components/ForexDataListItem'
import ForexData from '@src/models/ForexData'
import colors from '@src/utils/colors'

const AndroidRefreshControl = createNativeWrapper(RefreshControl, {
  disallowInterruption: true,
  shouldCancelWhenOutside: false
})

export default ({ navigation }: { navigation: any }) => {
  const fetchData = useFollowStore((state) => state.fetchData)
  const followedDataItems = useFollowStore((state) => state.followedDataItems)

  // const followedDataNames = useFollowStore((state) => state.followedDataNames)
  const removeDataKey = useFollowStore((state) => state.removeDataKey)
  const setAllDataKeys = useFollowStore((state) => state.setAllDataKeys)
  // const setInitialData = useFollowStore((state) => state.setInitialData)

  const editFollowedListEnabled = useUIStore((state) => state.editFollowedListEnabled)
  const setEditingFollowedList = useUIStore((state) => state.setEditingFollowedList)
  const setBottomSheetForexData = useUIStore((state) => state.setBottomSheetForexData)

  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // setAllDataKeys([])
    let refreshIntervalId: any
    const unsubscribeFocus = navigation.addListener('focus', async () => {
      await onRefresh()
      refreshIntervalId = setInterval(async () => {
        // await fetchData()
      }, 5000)
    })
    const unsubscribeBlur = navigation.addListener('blur', async () => {
      clearInterval(refreshIntervalId)
    })
    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: editFollowedListEnabled ? () => null : () => (
        <TouchableOpacity style={{ paddingHorizontal: 8 }}
          hitSlop={16}
          onPress={() => {
            navigation.navigate('Search')
          }}>
          <FontAwesome5 name='search-plus' size={20} color={'white'} />
        </TouchableOpacity>
      )
    })
  }, [navigation, editFollowedListEnabled])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchData()
    await new Promise(resolve => setTimeout(resolve, 300))
    setRefreshing(false)
  }, [])

  const renderItem = ({ item, drag, isActive }: RenderItemParams<ForexData>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          delayLongPress={100}
          onLongPress={editFollowedListEnabled ? () => {
            ReactNativeHapticFeedback.trigger("impactLight")
            drag()
          } : undefined}
          onPress={editFollowedListEnabled ? undefined : () => {
            setBottomSheetForexData(item)
          }}
          style={{}}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            {editFollowedListEnabled && <FontAwesome5 size={20} name='bars' color={colors.mediumGray} style={{
              paddingLeft: 20
            }} />}
            {editFollowedListEnabled && <View style={{ width: 8 }} />}
            <ForexDataListItem
              data={item} key={item.name} style={styles.itemContainer} />
            {editFollowedListEnabled &&
              <TouchableOpacity
                style={{ paddingRight: 16, paddingLeft: 12 }} hitSlop={24}
                onPress={() => { removeDataKey(item.key) }}
              >
                <FontAwesome5 size={16} color={colors.red} name={'minus-circle'} />
              </TouchableOpacity>
            }
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  return (
    <>
      <DraggableFlatList
        data={followedDataItems}
        onDragEnd={({ data }) => {
          // setAllData(data.map(d => d.name))
        }}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        containerStyle={styles.container}
        contentContainerStyle={{
          paddingBottom: 90
        }}
        refreshControl={!!editFollowedListEnabled ? undefined : <AndroidRefreshControl
          refreshing={refreshing}
          enabled={!editFollowedListEnabled}
          onRefresh={onRefresh}
          colors={[Colors.darkBackground]}
          tintColor={Colors.white}
        />}
        indicatorStyle='white'
      />
      <TouchableOpacity style={{
        position: 'absolute', padding: 16, bottom: 32, right: 16,
        backgroundColor: colors.darkerGray,
        width: 48, height: 48,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
        activeOpacity={0.6}
        onPress={() => {
          setEditingFollowedList(!editFollowedListEnabled)
        }}
      >
        <FontAwesome5 size={16} color={colors.white} name={editFollowedListEnabled ? 'check' : 'edit'} />
      </TouchableOpacity>
    </>
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

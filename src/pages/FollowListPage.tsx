import { useEffect, useState, useCallback } from 'react'
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
  const followedData = useFollowStore((state) => state.followedData)
  const fetchData = useDataStore((state) => state.fetchData)
  const firebaseUser = useAuthStore((state) => state.firebaseUser)
  const removeData = useFollowStore((state) => state.removeData)
  const setAllData = useFollowStore((state) => state.setAllData)
  const editFollowedListEnabled = useUIStore((state) => state.editFollowedListEnabled)
  const setEditingFollowedList = useUIStore((state) => state.setEditingFollowedList)

  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (firebaseUser)
      fetchData()
  }, [firebaseUser])

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
    setTimeout(() => {
      setRefreshing(false)
    }, 300)
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
          style={{}}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            {editFollowedListEnabled && <FontAwesome5 size={20} name='bars' color={colors.mediumGray} style={{
              paddingLeft: 20
            }} />}
            {editFollowedListEnabled && <View style={{ width: 8 }} />}
            <ForexDataListItem
              data={item} key={item.name} style={styles.itemContainer} />
            {editFollowedListEnabled && <TouchableOpacity style={{ paddingRight: 16, paddingLeft: 12 }} hitSlop={24} onPress={() => {
              removeData(item)
            }}>
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
        data={followedData}
        onDragEnd={({ data }) => {
          setAllData(data)
        }}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        containerStyle={{ flex: 1 }}
        style={styles.container}
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
    // flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  itemContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

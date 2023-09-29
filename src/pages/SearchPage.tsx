import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import {
  View, Platform, StyleSheet, Text, TouchableOpacity,
} from 'react-native'
import { SearchBar } from '@rneui/themed'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import colors from '@src/utils/colors'
import { useDataStore } from '@src/stores/dataStore'
import { useFollowStore } from '@src/stores/followStore'
import MetaDataListItem from '@src/components/MetaDataListItem'
import AppText from '@src/components/AppText'
import { FlashList } from '@shopify/flash-list'
import MetaData, { DataType } from '@src/models/MetaData'
export default () => {
  const inputRef = useRef(null)
  const updateSearch = (search: string) => {
    setSearchLabel(search)
  }
  const searchedMetaData = useDataStore((state) => state.searchedMetaData)
  const setSearchLabel = useDataStore((state) => state.setSearchLabel)
  const searchLabel = useDataStore((state) => state.searchLabel)

  const addDataKey = useFollowStore((state) => state.addDataKey)
  const removeDataKey = useFollowStore((state) => state.removeDataKey)
  const followedDataKeys = useFollowStore((state) => state.followedDataKeys)

  useEffect(() => {
    return () => {
      setSearchLabel('')
    }
  }, [])

  const onItemPress = (alreadyAdded: boolean, key: string) => {
    if (alreadyAdded) {
      removeDataKey(key)
    } else {
      addDataKey(key)
    }
  }

  const listItems: (MetaData | DataType)[] = useMemo(() => {
    let listItems: (MetaData | DataType)[] = [...searchedMetaData]

    const curIndex = listItems.findIndex(d => (typeof d !== 'string') && d.type == DataType.CUR)
    if (curIndex != -1)
      listItems.splice(curIndex, 0, DataType.CUR)

    const goldIndex = listItems.findIndex(d => (typeof d !== 'string') && d.type == DataType.GOLD)
    if (goldIndex != -1)
      listItems.splice(goldIndex, 0, DataType.GOLD)

    const pariteIndex = listItems.findIndex(d => (typeof d !== 'string') && d.type == DataType.PARITE)
    if (pariteIndex != -1)
      listItems.splice(pariteIndex, 0, DataType.PARITE)

    const indIndex = listItems.findIndex(d => (typeof d !== 'string') && d.type == DataType.IND)
    if (indIndex != -1)
      listItems.splice(indIndex, 0, DataType.IND)

    const stockIndex = listItems.findIndex(d => (typeof d !== 'string') && d.type == DataType.STOCK)
    if (stockIndex != -1)
      listItems.splice(stockIndex, 0, DataType.STOCK)
    return listItems
  }, [searchedMetaData])

  const stickyHeaderIndices = useMemo(() => {
    return listItems
      .map((item, index) => {
        if (typeof item === "string") {
          return index
        } else {
          return null
        }
      })
      .filter((item) => item !== null) as number[]
  }, [listItems])


  return (
    <View style={styles.container}>
      <SearchBar
        ref={inputRef}
        value={searchLabel}
        round={Platform.OS == 'ios'}
        cursorColor={colors.white}
        selectionColor={colors.white}
        placeholderTextColor={colors.darkGray}
        placeholder='Doviz/Emtia/Hisse Ara'
        autoCapitalize='none'
        autoComplete='off'
        containerStyle={styles.searchBarContainer}
        onChangeText={updateSearch}
      />
      <FlashList
        data={listItems}
        estimatedItemSize={56}
        extraData={followedDataKeys}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            let label
            switch (item) {
              case DataType.CUR:
                label = 'Kur'
                break
              case DataType.PARITE:
                label = 'Parite'
                break
              case DataType.GOLD:
                label = 'Altin'
                break
              case DataType.IND:
                label = 'Endeks'
                break
              case DataType.STOCK:
                label = 'Hisse'
                break
              default:
                break
            }
            return (
              <View style={{
                height: 36, borderColor: colors.white, alignItems: 'center', justifyContent: 'center',
                borderBottomWidth: 0.5, backgroundColor: colors.darkBackground,
              }}>
                <AppText style={{ fontWeight: 'bold', color: colors.white }}>{label}</AppText>
              </View>
            )
          }
          const alreadyAdded = !!followedDataKeys.find(fdKey => fdKey == item.key)
          return (
            <View style={styles.itemContainer}>
              <MetaDataListItem item={item} onPress={() => onItemPress(alreadyAdded, item.key)} />
              <TouchableOpacity
                style={styles.addButtonContainer} hitSlop={24}
                onPress={() => onItemPress(alreadyAdded, item.key)}
              >
                <FontAwesome5 size={16} color={alreadyAdded ? colors.red : colors.green} name={alreadyAdded ? 'minus-circle' : 'plus-circle'} />
              </TouchableOpacity>
            </View>
          )
        }}
        stickyHeaderIndices={stickyHeaderIndices}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  addButtonContainer: {
    marginLeft: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarContainer: {
    backgroundColor: colors.darkBackground,
    borderTopColor: colors.darkerGray,
    borderBottomColor: colors.darkerGray,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  }
})
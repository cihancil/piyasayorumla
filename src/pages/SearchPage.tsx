import { useRef, useEffect } from 'react'
import {
  View, Platform, StyleSheet, Text, TouchableOpacity, FlatList,
} from 'react-native'
import { SearchBar } from '@rneui/themed'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import colors from '@src/utils/colors'
import { useDataStore } from '@src/stores/dataStore'
import { useFollowStore } from '@src/stores/followStore'
import ForexDataListItem from '@src/components/ForexDataListItem'
import AppText from '@src/components/AppText'
export default () => {
  const inputRef = useRef(null)
  const updateSearch = (search: string) => {
    setSearchLabel(search)
  }
  const searchedData = useDataStore((state) => state.searchedData)
  const setSearchLabel = useDataStore((state) => state.setSearchLabel)
  const searchLabel = useDataStore((state) => state.searchLabel)

  const addData = useFollowStore((state) => state.addData)
  const removeData = useFollowStore((state) => state.removeData)
  const followedDataNames = useFollowStore((state) => state.followedDataNames)


  useEffect(() => {
    return () => {
      setSearchLabel('')
    }
  }, [])

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
        containerStyle={{
          backgroundColor: colors.darkBackground,
          borderTopColor: colors.darkerGray,
          borderBottomColor: colors.darkerGray,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
        }}
        onChangeText={updateSearch}
      />
      <FlatList
        data={searchedData}
        keyExtractor={item => item.name}
        renderItem={({ item }) => {
          const alreadyAdded = !!followedDataNames.find(fdName => fdName == item.name)
          return (
            <View style={styles.itemContainer}>
              <ForexDataListItem data={item} style={styles.item} />
              <TouchableOpacity style={styles.addButtonContainer} hitSlop={24} onPress={() => {
                if (alreadyAdded) {
                  removeData(item)
                } else {
                  addData(item)
                }
              }}>
                <FontAwesome5 size={16} color={alreadyAdded ? colors.red : colors.green} name={alreadyAdded ? 'minus-circle' : 'plus-circle'} />
              </TouchableOpacity>
            </View>
          )
        }}
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
  }
})
import { useRef, useState } from 'react'
import {
  View, Platform, StyleSheet, Text,
} from 'react-native'
import { SearchBar } from '@rneui/themed'
import { FlashList } from "@shopify/flash-list"

import colors from '@src/utils/colors'
import { useDataStore } from '@src/stores/dataStore'
import ForexDataListItem from '@src/components/ForexDataListItem'
export default () => {
  const inputRef = useRef(null)
  const updateSearch = (search: string) => {
    setSearchLabel(search)
  }
  const searchedData = useDataStore((state) => state.searchedData)
  const setSearchLabel = useDataStore((state) => state.setSearchLabel)
  const searchLabel = useDataStore((state) => state.searchLabel)
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
      <FlashList
        data={searchedData}
        renderItem={({ item }) => <ForexDataListItem data={item} style={{
          paddingVertical: 4,
        }} />}
        estimatedItemSize={searchedData.length}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  }
})
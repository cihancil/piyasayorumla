import MetaData from '@src/models/MetaData'
import * as React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import AppText from './AppText'
import colors from '@src/utils/colors'

interface MetaDataListItemProps {
  item: MetaData,
  onPress?: () => void,
}

const MetaDataListItem = (props: MetaDataListItemProps) => {
  const { item, onPress } = props
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <AppText style={{
          color: colors.white,
          fontSize: 20,
        }}>
          {`${item.name}`}
        </AppText>
        <AppText style={{
          color: colors.mediumGray,
          fontSize: 16,
        }}>
          {item.fullName}
        </AppText>
      </View>
    </TouchableOpacity >
  )
}

export default MetaDataListItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 56,
  }
})

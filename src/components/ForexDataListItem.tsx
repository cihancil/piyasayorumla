import * as React from 'react'
import { View, StyleSheet } from 'react-native'

import ForexData from '@src/models/ForexData'
import AppText from '@src/components/AppText'
import Colors from '@src/utils/colors'
import { ViewProps } from 'react-native'

interface ForexDataListItemProps extends ViewProps {
  data: ForexData
}

const ForexDataListItem = (props: ForexDataListItemProps) => {
  const { data, style } = props
  const value = data.son || data.satis
  const hasFullName = !!data.fullName
  const upperLabel = data.name
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <AppText style={{
          color: Colors.white,
          fontSize: 20,
        }}>
          {upperLabel}
        </AppText>
        {hasFullName && <AppText style={{
          color: Colors.mediumGray,
          fontSize: 16,

        }}>
          {data.fullName}
        </AppText>}
      </View>
      <View style={{ flexDirection: 'column' }}>
        <AppText style={{
          color: Colors.white,
          fontSize: 20,
          textAlign: 'right',
        }}>
          {value}
        </AppText>
        <AppText style={{
          textAlign: 'right',
          color: data.degisim?.startsWith('%-') ? 'red' : 'green',
          fontSize: 16,
        }}>
          {data.degisim}
        </AppText>
      </View>
    </View>
  )
}

export default ForexDataListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

interface ForexDetailBottomSheetProps {
  open: boolean
  onClose: () => void
}

const ForexDetailBottomSheet = (props: ForexDetailBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  // bottomSheetRef.current?.snapToIndex(0)
  if (!props.open) return null
  return (
    <BottomSheet
      ref={bottomSheetRef}
      // index={0}
      snapPoints={['50%']}
      enablePanDownToClose
      onClose={props.onClose}
    // enableDynamicSizing
    >
      <View style={styles.container}>
        <Text>ForexDetailBottomSheet</Text>
      </View>
    </BottomSheet>
  )
}

export default ForexDetailBottomSheet

const styles = StyleSheet.create({
  container: {
    height: 300,
  }
})

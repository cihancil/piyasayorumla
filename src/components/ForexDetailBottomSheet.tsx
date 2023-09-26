import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

import { useUIStore } from '@src/stores/uiStore'
import { useHistoryStore } from '@src/stores/historyStore'

interface ForexDetailBottomSheetProps {
  onClose: () => void
}

const ForexDetailBottomSheet = (props: ForexDetailBottomSheetProps) => {
  const setBottomSheetForexData = useUIStore((state) => state.setBottomSheetForexData)
  const bottomSheetForexData = useUIStore((state) => state.bottomSheetForexData)
  const fetchHistory = useHistoryStore((state) => state.fetchHistory)
  const isFetching = useHistoryStore((state) => state.isFetching)
  const dailyHistoryData = useHistoryStore((state) => state.dailyHistoryData)

  useEffect(() => {
    try {
      fetchHistory(bottomSheetForexData!)
    } catch (error) {
      console.log(error)
    }
  }, [bottomSheetForexData])
  const bottomSheetRef = useRef<BottomSheet>(null)

  if (!bottomSheetForexData) return null
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['50%']}
      enablePanDownToClose
      onClose={() => {
        setBottomSheetForexData(null)
      }}
      backdropComponent={props => (<BottomSheetBackdrop {...props}
        opacity={0.5}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} />)}
    >
      <View style={styles.container}>
        <Text>ForexDetailBottomSheet</Text>
        <Text>{bottomSheetForexData?.endpoint}</Text>
        {isFetching && <Text>BUSY</Text>}
        {dailyHistoryData.map(dailyData => {
          return (
            <>
              <Text>{dailyData.update_date}</Text>
              <Text>{dailyData.close}</Text>
            </>
          )
        })}
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

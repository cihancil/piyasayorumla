import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

import { useUIStore } from '@src/stores/uiStore'
import { useHistoryStore } from '@src/stores/historyStore'
import AppText from './AppText'
import ForexGraph from '@src/components/ForexGraph'
import colors from '@src/utils/colors'

interface ForexDetailBottomSheetProps {
  onClose: () => void
}

const ForexDetailBottomSheet = (props: ForexDetailBottomSheetProps) => {
  const setBottomSheetForexData = useUIStore((state) => state.setBottomSheetForexData)
  const bottomSheetForexData = useUIStore((state) => state.bottomSheetForexData)
  const fetchHistory = useHistoryStore((state) => state.fetchHistory)
  const isFetching = useHistoryStore((state) => state.isFetching)
  const dailyHistoryData = useHistoryStore((state) => state.dailyHistoryData)
  const monthlyHistoryData = useHistoryStore((state) => state.monthlyHistoryData)
  const yearlyHistoryData = useHistoryStore((state) => state.yearlyHistoryData)

  useEffect(() => {
    try {
      if (bottomSheetForexData) {
        console.log('==fetch', bottomSheetForexData)
        fetchHistory(bottomSheetForexData!)
      }
    } catch (error) {
      console.log(error)
    }
  }, [bottomSheetForexData])

  const bottomSheetRef = useRef<BottomSheet>(null)
  const dailyPoints = useMemo(() => {
    return dailyHistoryData.map(d => {
      return { value: d.close, date: new Date(d.update_date * 1000) }
    })
  }, [dailyHistoryData])
  const monthlyPoints = useMemo(() => {
    return monthlyHistoryData.map(d => {
      return { value: d.close, date: new Date(d.update_date * 1000) }
    })
  }, [monthlyHistoryData])
  const yearlyPoints = useMemo(() => {
    const yearlyPointsToReturn: any[] = []
    yearlyHistoryData.forEach((d: any, ind: number) => {
      if (yearlyPointsToReturn.length == 0) {
        yearlyPointsToReturn.push({
          value: d.close, date: new Date(d.update_date * 1000)
        })
      } else {
        const last = yearlyPointsToReturn[yearlyPointsToReturn.length - 1]
        const lastDate = last.date
        const elementDate = new Date(d.update_date * 1000)
        const differenceInTime = elementDate.getTime() - lastDate.getTime()
        const differenceInDays = differenceInTime / (1000 * 3600 * 24)
        if (differenceInDays > 1) {
          const times = differenceInDays - 1
          for (let i = 0; i < times; i++) {
            let generatedDate = last.date
            generatedDate.setDate(generatedDate.getDate() + i + 1)
            yearlyPointsToReturn.push({
              value: last.value,
              date: generatedDate,
            })
          }
        }
        yearlyPointsToReturn.push({
          value: d.close, date: new Date(d.update_date * 1000),
        })
      }
    })
    return yearlyPointsToReturn
  }, [monthlyHistoryData])

  if (!bottomSheetForexData) return null
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[400]}
      enablePanDownToClose
      onClose={() => {
        setBottomSheetForexData(null)
      }}
      handleStyle={{
        backgroundColor: colors.darkBackground,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.darkGray,
      }}
      backgroundStyle={{
        backgroundColor: colors.darkBackground,
      }}
      overDragResistanceFactor={0}
      backdropComponent={props => (<BottomSheetBackdrop {...props}
        opacity={0.5}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} />)}
    >
      <View style={styles.container}>
        {isFetching && <ActivityIndicator />}
        {!isFetching && <ForexGraph
          dailyPoints={dailyPoints}
          monthlyPoints={monthlyPoints}
          yearlyPoints={yearlyPoints}
          forexData={bottomSheetForexData}
        />}
      </View>
    </BottomSheet >

  )
}

export default ForexDetailBottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.darkBackground,
  }
})

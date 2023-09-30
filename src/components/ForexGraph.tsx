import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { GraphPoint, LineGraph } from 'react-native-graph'
import dayjs from 'dayjs'
require('dayjs/locale/tr')
dayjs.locale('tr')

import AppText from '@src/components/AppText'
import colors from '@src/utils/colors'
import ForexData from '@src/models/ForexData'

const GRADIENT_FILL_COLORS = ['#a4d8ff', '#80a7c6', '#5d788f', '#3b4c5d', '#1c252e']

interface ForexGraphProps {
  dailyPoints: GraphPoint[],
  monthlyPoints: GraphPoint[],
  yearlyPoints: GraphPoint[],
  forexData: ForexData,
}

const ForexGraph = (props: ForexGraphProps) => {
  const { forexData, dailyPoints, monthlyPoints, yearlyPoints } = props
  const [index, setIndex] = useState<number>(0)
  let isGesturing = false
  let skipOnPointSelectedEvent = true

  const points = useMemo(() => {
    return (index == 0) ? dailyPoints :
      (index == 1) ? monthlyPoints : yearlyPoints
  }, [index, dailyPoints, monthlyPoints, yearlyPoints])

  const [displayedPoint, setDisplayedPoint] = useState<GraphPoint>(points[points.length - 1])
  let pointSelectedCountPerRender = 0

  useEffect(() => {
    setDisplayedPoint(points[points.length - 1])
  }, [index, points])

  const onGestureEnd = useCallback(() => {
    if (!isGesturing) return
    const newPoint = points[points.length - 1]
    isGesturing = false
    if (displayedPoint.value != newPoint.value && displayedPoint.date != newPoint.date) {
      setDisplayedPoint(points[points.length - 1])
    }
  }, [points, setDisplayedPoint, displayedPoint, isGesturing])

  const onIndexChange = (index: number) => {
    setIndex(index)
    pointSelectedCountPerRender = 0
  }

  const renderInfo = useCallback(() => {
    if (!displayedPoint) return null
    return (
      <View style={{
        paddingHorizontal: 16, paddingVertical: 8,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <View>
          <AppText style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>
            {points.length}{forexData.fullName || forexData.name}
          </AppText>
          <AppText style={{ color: colors.white, fontWeight: 'bold', fontSize: 24 }}>
            {(+displayedPoint.value.toFixed(4)).toLocaleString('tr')}
          </AppText>
          <AppText style={{ color: colors.white, fontSize: 12, }}>
            {dayjs(displayedPoint.date).format(index == 0 ? 'D MMMM YYYY HH:mm' : 'D MMMM YYYY')}
          </AppText>
        </View>
        <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
          <View style={{ alignItems: 'flex-end', marginRight: 8, }}>
            <AppText style={{ color: forexData.changeRate > 0 ? colors.green : colors.red, fontSize: 16, lineHeight: 21 }}>
              {forexData.changeRateStr}
            </AppText>
            <AppText style={{ color: forexData.monthlyChangeRate > 0 ? colors.green : colors.red, fontSize: 16, lineHeight: 21 }}>
              {forexData.monthlyChangeRateStr}
            </AppText>
            <AppText style={{ color: forexData.yearlyChangeRate > 0 ? colors.green : colors.red, fontSize: 16, lineHeight: 21 }}>
              {forexData.yearlyChangeRateStr}
            </AppText>
          </View>
          <View style={{ alignItems: 'flex-end', }}>
            <AppText style={{ color: colors.mediumGray, fontSize: 16, lineHeight: 21 }}>
              1G
            </AppText>
            <AppText style={{ color: colors.mediumGray, fontSize: 16, lineHeight: 21 }}>
              1A
            </AppText>
            <AppText style={{ color: colors.mediumGray, fontSize: 16, lineHeight: 21 }}>
              1Y
            </AppText>
          </View>
        </View>
      </View >
    )
  }, [displayedPoint, forexData])

  const renderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 20 }}>
        <TouchableOpacity hitSlop={16} style={{ marginHorizontal: 32 }} onPress={() => onIndexChange(0)}>
          <AppText style={{
            color: (index == 0) ? colors.blue : colors.darkGray,
            fontWeight: 'bold',
          }}>
            Bugün
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={16} style={{ marginHorizontal: 32 }} onPress={() => onIndexChange(1)}>
          <AppText style={{
            color: (index == 1) ? colors.blue : colors.darkGray,
            fontWeight: 'bold',
          }}>
            Bu Ay
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={16} style={{ marginHorizontal: 32 }} onPress={() => onIndexChange(2)}>
          <AppText style={{
            color: (index == 2) ? colors.blue : colors.darkGray,
            fontWeight: 'bold',
          }}>
            Bu Yıl
          </AppText>
        </TouchableOpacity>
      </View>
    )
  }, [index, setIndex])

  return (
    <View style={styles.container}>
      {renderInfo()}
      {renderButtons()}
      <LineGraph
        points={points}
        animated={true}
        color={colors.blue}
        enablePanGesture
        panGestureDelay={0}
        gradientFillColors={GRADIENT_FILL_COLORS}
        verticalPadding={36}
        style={styles.graphStyle}
        onPointSelected={(point) => {
          pointSelectedCountPerRender = pointSelectedCountPerRender + 1
          if (pointSelectedCountPerRender <= 1) {
            return
          }
          setDisplayedPoint(point)
        }}
        onGestureStart={() => {
          isGesturing = true
        }}
        onGestureEnd={onGestureEnd}
      />
    </View >
  )
}

export default ForexGraph

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  graphStyle: {
    flex: 1,
    paddingBottom: 16,
  },
})

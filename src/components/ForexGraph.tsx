import React, { useMemo, useCallback, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
  const { dailyPoints, monthlyPoints, yearlyPoints } = props
  const [index, setIndex] = useState<number>(0)
  let points: GraphPoint[] = []
  switch (index) {
    case 0:
      points = dailyPoints
      break
    case 1:
      points = monthlyPoints
      break
    case 2:
      points = yearlyPoints
      break
    default:
      break
  }
  points =
    (index == 0) ? dailyPoints :
      (index == 1) ? monthlyPoints : yearlyPoints

  const [point, setPoint] = useState<GraphPoint>(points[points.length - 1])
  const updatePriceTitle = (point: GraphPoint) => {
    setPoint(point)
  }

  const renderInfo = useCallback(() => {
    if (!point) return null
    return (
      <View style={{
        paddingHorizontal: 16, paddingVertical: 8,
      }}>
        <AppText style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>
          {props.forexData.fullName || props.forexData.name}
        </AppText>
        <AppText style={{ color: colors.white, fontWeight: 'bold', fontSize: 24 }}>
          {point.value}
        </AppText>
        <AppText style={{ color: colors.white, fontSize: 12, }}>
          {dayjs(point.date).format(index == 0 ? 'D MMMM YYYY HH:mm' : 'D MMMM YYYY')}
        </AppText>
      </View >
    )
  }, [point, props.forexData])

  const renderButtons = useCallback(() => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, marginTop: 20 }}>
        <TouchableOpacity hitSlop={16} style={{ marginHorizontal: 32 }} onPress={() => setIndex(0)}>
          <AppText style={{
            color: (index == 0) ? colors.blue : colors.darkGray,
            fontWeight: 'bold',
          }}>
            Bugün
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={16} style={{ marginHorizontal: 32 }} onPress={() => setIndex(1)}>
          <AppText style={{
            color: (index == 1) ? colors.blue : colors.darkGray,
            fontWeight: 'bold',
          }}>
            Bu Ay
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={16} style={{ marginHorizontal: 32 }} onPress={() => setIndex(2)}>
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
        style={{
          flex: 1,
        }}
        onPointSelected={(p) => updatePriceTitle(p)}
        onGestureEnd={() => {
          setPoint(points[points.length - 1])
        }}
      />
    </View >
  )
}

export default ForexGraph

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

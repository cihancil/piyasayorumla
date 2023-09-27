import React, { useMemo, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { GraphPoint, LineGraph } from 'react-native-graph'
import dayjs from 'dayjs'

require('dayjs/locale/tr')
dayjs.locale('tr')

import AppText from '@src/components/AppText'
const GRADIENT_FILL_COLORS = ['#7476df5D', '#7476df4D', '#7476df00']

interface ForexGraphProps {
  dailyPoints: GraphPoint[],
  monthlyPoints: GraphPoint[],
  yearlyPoints: GraphPoint[],
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

  return (
    <View style={styles.container}>
      {point && <>
        <AppText>
          {dayjs(point.date).format(index == 0 ? 'D MMMM YYYY HH:mm' : 'D MMMM YYYY')}
        </AppText>
        <AppText>
          {point.value}
        </AppText>
        <AppText>
          {points.length}
        </AppText>
      </>}
      <View style={{ flexDirection: 'row' }}>
        <Button title='daily' onPress={() => setIndex(0)} />
        <Button title='monthly' onPress={() => setIndex(1)} />
        <Button title='yearly' onPress={() => setIndex(2)} />
      </View>
      <LineGraph
        points={points}
        animated={true}
        color="#4484B2"
        enablePanGesture
        panGestureDelay={0}
        gradientFillColors={GRADIENT_FILL_COLORS}
        verticalPadding={36}
        style={{
          flex: 1,
          height: 180,
          marginBottom: 40,
        }}
        onPointSelected={(p) => updatePriceTitle(p)}
        onGestureEnd={() => {
          setPoint(points[points.length - 1])
        }}
      />
    </View>
  )
}

export default ForexGraph

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

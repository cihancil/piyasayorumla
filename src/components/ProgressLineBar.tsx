import * as React from 'react'
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native'
import colors from '@src/utils/colors'

interface ProgressLineBarProps {
  onEnd?: () => Promise<void>,
}

const ProgressLineBar = (props: ProgressLineBarProps) => {
  const progressAnim = React.useRef(new Animated.Value(0)).current
  const { width } = useWindowDimensions()


  React.useEffect(() => {
    runAnimation()
    return (() => {
      progressAnim.setValue(0)
    })
  }, [])

  const runAnimation = React.useCallback(() => {
    progressAnim.setValue(0)
    Animated.timing(progressAnim, {
      toValue: width,
      duration: 10000,
      useNativeDriver: false,
    }).start(async () => {
      if (props.onEnd)
        await props.onEnd()
      runAnimation()
    })
  }, [progressAnim, props.onEnd])

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          height: 2,
          backgroundColor: colors.blue,
          borderTopRightRadius: 2,
          borderBottomRightRadius: 2,
          width: progressAnim
        }} />
    </View>
  )
}

export default ProgressLineBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBackground,
  },
})

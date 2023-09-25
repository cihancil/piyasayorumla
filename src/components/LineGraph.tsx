import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

interface LineGraphProps { }

const LineGraph = (props: LineGraphProps) => {
  return (
    <View style={styles.container}>
      <Text>LineGraph</Text>
    </View>
  )
}

export default LineGraph

const styles = StyleSheet.create({
  container: {}
})

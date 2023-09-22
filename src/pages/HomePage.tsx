import {
  View, Text, StyleSheet,
} from 'react-native'

import Colors from '@src/utils/colors'

export default () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 40,
        }}>Home Page</Text>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  }
})
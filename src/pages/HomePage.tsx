import {
  View, Text, StyleSheet,
} from 'react-native'
import { LineGraph } from 'react-native-graph'

import Colors from '@src/utils/colors'

export default () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 40,
        }}>Home Page</Text>
      <LineGraph
        points={[
          { close: 1667.343, update_date: 1695764518 },
          { close: 1667.618, update_date: 1695764572 },
          { close: 1667.227, update_date: 1695764638 },
          { close: 1667.297, update_date: 1695764692 },
          { close: 1667.441, update_date: 1695764746 },
          { close: 1667.303, update_date: 1695764813 },
          { close: 1666.123, update_date: 1695764879 },
          { close: 1667.434, update_date: 1695764935 },
          { close: 1667.266, update_date: 1695764991 },
          { close: 1667.838, update_date: 1695765058 },
          { close: 1667.502, update_date: 1695765111 },
          { close: 1667.349, update_date: 1695765178 },
          { close: 1666.343, update_date: 1695765232 },
          { close: 1667.226, update_date: 1695765286 },
          { close: 1674.725, update_date: 1695765354 },
          { close: 1667.32, update_date: 1695765408 },
          { close: 1668.946, update_date: 1695765474 },
          { close: 1667.326, update_date: 1695765531 },
          { close: 1667.494, update_date: 1695765597 },
          { close: 1666.625, update_date: 1695765652 },
          { close: 1665.75, update_date: 1695765718 },
          { close: 1666.929, update_date: 1695765773 },
          { close: 1662.173, update_date: 1695765838 },
          { close: 1666.857, update_date: 1695765894 },
          { close: 1666.599, update_date: 1695765959 },
          { close: 1668.727, update_date: 1695766014 },
          { close: 1667.711, update_date: 1695766068 },
          { close: 1668.586, update_date: 1695766135 },
          { close: 1668.336, update_date: 1695766190 },
          { close: 1668.014, update_date: 1695766256 },
          { close: 1668.934, update_date: 1695766311 },
          { close: 1667.54, update_date: 1695766378 },
          { close: 1668.241, update_date: 1695766433 },
          { close: 1666.048, update_date: 1695766499 },
          { close: 1667.952, update_date: 1695766553 },
          { close: 1667.872, update_date: 1695766618 },
          { close: 1667.382, update_date: 1695766674 },
          { close: 1667.275, update_date: 1695766729 },
          { close: 1667.442, update_date: 1695766794 },
          { close: 1667.751, update_date: 1695766850 },
          { close: 1667.873, update_date: 1695766916 },
          { close: 1671.234, update_date: 1695766970 },
          { close: 1667.438, update_date: 1695767037 },
          { close: 1667.42, update_date: 1695767091 },
          { close: 1668.228, update_date: 1695767147 },
          { close: 1666.825, update_date: 1695767212 },
          { close: 1670.818, update_date: 1695767279 },
          { close: 1667.276, update_date: 1695767333 },
          { close: 1668.277, update_date: 1695767399 },
          { close: 1668.661, update_date: 1695767455 },
          { close: 1668.922, update_date: 1695767511 },
          { close: 1668.492, update_date: 1695767577 },
          { close: 1668.379, update_date: 1695767632 },
          { close: 1667.481, update_date: 1695767698 },
          { close: 1668.053, update_date: 1695767753 },
          { close: 1667.763, update_date: 1695767819 },
          { close: 1668.395, update_date: 1695767873 },
          { close: 1668.029, update_date: 1695767939 },
          { close: 1668.416, update_date: 1695767962 }
        ].map(d => ({ value: d.close, date: new Date(d.update_date) }))}
        animated={true}
        color="#4484B2"
        enablePanGesture
        style={{
          flex: 1,
          padding: 30,
        }}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  }
})
import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Colors from '../utils/colors'

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<any>;
}

export default (props: TabBarIconProps) => {
  const { route, focused, size, color } = props
  let iconName = ''
  switch (route.name) {
    case 'Home':
      iconName = 'comments-dollar'
      break
    case 'FollowList':
      iconName = 'chart-bar'
      break
    case 'Search':
      iconName = 'search-dollar'
      break
    case 'Menu':
      iconName = 'user-circle'
      break
  }
  return (
    <View style={styles.container}>
      <FontAwesome5 name={iconName} size={size} color={color} />
      <View style={StyleSheet.flatten([styles.dot, {
        backgroundColor: focused ? Colors.lightGray : 'transparent',
      }])} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    marginTop: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  }
})
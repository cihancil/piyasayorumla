import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomePage from '@src/pages/HomePage'
import FollowListPage from '@src/pages/FollowListPage'
import MenuPage from '@src/pages/MenuPage'

import Colors from '@src/utils/colors'
import Configs from '@src/utils/configs'
import TabBarIcon from '@src/components/TabBarIcon';
import HomeHeader from '@src/components/HomeHeader';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.darkBackground}
        barStyle={'light-content'}
      />
      <NavigationContainer  >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopWidth: 0,
              backgroundColor: Colors.darkBackground,
              height: Configs.TABBAR_HEIGHT,
            },
            tabBarIcon: ({ focused, color, size }) => {
              return <TabBarIcon route={route} focused={focused} color={color} size={size} />
            },
            tabBarActiveTintColor: Colors.lightGray,
            tabBarInactiveTintColor: Colors.darkGray,
          })}
        >
          <Tab.Screen name="Home" component={HomePage} options={{
            header: () => <HomeHeader />
          }} />
          <Tab.Screen name="FollowList" component={FollowListPage} options={{
            headerTitle: 'Takip Listem',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: Colors.white,
              fontWeight: 'bold',
            },
            headerStyle: {
              height: Configs.HEADER_HEIGHT,
              backgroundColor: Colors.darkBackground,
            }
          }} />
          <Tab.Screen name="Menu" component={MenuPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  }
})
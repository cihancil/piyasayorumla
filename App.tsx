import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, View, Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import HomePage from '@src/pages/HomePage'
import FollowListPage from '@src/pages/FollowListPage'
import MenuPage from '@src/pages/MenuPage'
import SearchPage from '@src/pages/SearchPage'

import Configs from '@src/utils/configs'
import TabBarIcon from '@src/components/TabBarIcon'
import HomeHeader from '@src/components/HomeHeader'
import { useAuthStore } from '@src/stores/authStore'
import AppText from '@src/components/AppText'
import colors from '@src/utils/colors'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  const anonymousAuthenticate = useAuthStore((state) => state.anonymousAuthenticate)

  useEffect(() => {
    anonymousAuthenticate()
  }, [])


  const FollowListStack = () => (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        animation: Platform.select({
          ios: 'default',
          android: 'fade_from_bottom'
        }),
        headerStyle: {
          backgroundColor: colors.darkBackground,
        },
        headerTitleStyle: {
          color: colors.white,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen name="FollowList" component={FollowListPage} options={({ route, navigation }) => ({
        headerTitle: 'Takip Listem',
        headerTitleStyle: {
          color: colors.white,
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity style={{ paddingHorizontal: 8 }}
            hitSlop={16}
            onPress={() => {
              navigation.navigate('Search')
            }}>
            <FontAwesome5 name='search-plus' size={20} color={'white'} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity style={{}}
            hitSlop={16}
            onPress={() => {
              // navigation.navigate('Search')
            }}>
            <FontAwesome5 name='edit' size={18} color={'white'} />
            {/* 
            <AppText
              style={{ color: colors.white, fontWeight: 'bold' }}
            >{'Düzenle'}</AppText> */}
          </TouchableOpacity>
        )
      })} />
      <Stack.Screen name="Search" component={SearchPage} options={{
        headerTitle: 'Takip Listeme Ekle',
      }} />
    </Stack.Navigator>
  )
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={colors.darkBackground}
          barStyle={'light-content'}
        />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarShowLabel: false,
              tabBarStyle: {
                borderTopWidth: 0.2,
                backgroundColor: colors.darkBackground,
                height: Configs.TABBAR_HEIGHT,
              },
              tabBarIcon: ({ focused, color, size }) => {
                return <TabBarIcon route={route} focused={focused} color={color} size={size} />
              },
              tabBarActiveTintColor: colors.lightGray,
              tabBarInactiveTintColor: colors.darkGray,
            })}
          >
            <Tab.Screen name="Home" component={HomePage} options={{
              header: () => <HomeHeader />
            }} />
            <Tab.Screen name="FollowListStack" component={FollowListStack} options={{
              headerShown: false,
            }} />
            <Tab.Screen name="Menu" component={MenuPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  }
})
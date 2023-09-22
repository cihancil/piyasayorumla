import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Colors from '@src/utils/colors'
import Configs from '@src/utils/configs'

interface HomeHeaderProps { }

const HomeHeader = (props: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text>HomeHeader</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: Configs.HEADER_HEIGHT,
    backgroundColor: Colors.darkBackground,
  }
});

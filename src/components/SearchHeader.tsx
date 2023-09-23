import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SearchHeaderProps { }

const SearchHeader = (props: SearchHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text>SearchHeader</Text>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {}
});

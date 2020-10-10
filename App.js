// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9000ae" translucent />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

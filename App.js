// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#9000ae',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    // borderBottomColor: '#fb483e',
    // borderBottomWidth: 4,
    // borderRadius: 12,
    // borderLeftColor: '#fb483e',
    // borderLeftWidth: 2,
    fontWeight: 'bold',
    // paddingLeft: 12,
  },
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Plus une seconde à perdre ! ⏱️" }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Se connecter" }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "S'inscrire" }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}
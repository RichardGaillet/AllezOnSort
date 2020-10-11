// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ActivityScreen from './screens/ActivityScreen';
import colors from './config/colors'

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Plus une seconde à perdre ! ⏱️" }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Se connecter" }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "S'inscrire" }} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} options={{ title: "Activités" }} />
        <Stack.Screen name="Activity" component={ActivityScreen} options={{ title: "Activité" }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}
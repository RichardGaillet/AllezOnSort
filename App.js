// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ActivityScreen from './screens/ActivityScreen';
import NewActivityScreen from './screens/NewActivityScreen';
import MembersScreen from './screens/MembersScreen';
import ProfileScreen from './screens/ProfileScreen';
import colors from './config/colors'

import configFirebase from './config/configFirebase';
import * as firebase from 'firebase';
firebase.initializeApp(configFirebase)

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

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    accent: colors.secondary,
    background: colors.secondary,
    primary: colors.primary,
    surface: colors.light,
    text: colors.primary,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Plus une seconde à perdre ! ⏱️" }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: "Se connecter" }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "S'inscrire" }} />
          <Stack.Screen name="Activities" component={ActivitiesScreen} options={{ title: "Activités" }} />
          <Stack.Screen name="Activity" component={ActivityScreen} options={{ title: "Activité" }} />
          <Stack.Screen name="NewActivity" component={NewActivityScreen} options={{ title: "Ajouter une activité" }} />
          <Stack.Screen name="Members" component={MembersScreen} options={{ title: "Membres" }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profil" }} />
        </Stack.Navigator>
      </NavigationContainer >
    </PaperProvider>
  );
}
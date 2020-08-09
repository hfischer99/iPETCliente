import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawerContentComponent from './src/Components/Drawer';
import Teste from './src/screen/Teste'
Icon.loadFont();

import SignIn from './src/screen/SignIn'
import AuthLoadingScreen from './src/screen/SignIn/AuthLoadingScreen'

const MainStack = createDrawerNavigator({
    SignIn: {
      screen: SignIn
    },
    Teste:{
      screen: Teste
    }
  },
  {
    initialRouteName: 'Teste',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#836FFF',
      activeBackgroundColor: '#e6e6e6',
    }
  });
  
  const StackNavigatorContainer = createAppContainer(MainStack);
  
  const AuthStack = createStackNavigator(
    {
      SignIn: SignIn,
      App: StackNavigatorContainer,
      // SignUp: RegisterUser
      
      Teste: Teste
    },
    {
      initialRouteName: 'SignIn',
      headerMode: 'none',
      header: null,
    },
  );
  
  const RootStack = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: StackNavigatorContainer,
      // Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading',
    },
  );
  
  const RootStackContainer = createAppContainer(RootStack);
  
  export default RootStackContainer;
  
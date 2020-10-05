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
import Colors from './src/Components/Colors'
import Teste from './src/screen/Teste'
import Editar from './src/Pages/User/edit'
import Register from './src/Pages/User/register'
import Servico from './src/screen/Servico'
import Agendamento from './src/screen/Agendamento'
import Card from './src/screen/Card'
Icon.loadFont();

import SignIn from './src/screen/SignIn'
import AuthLoadingScreen from './src/screen/SignIn/AuthLoadingScreen'

const MainStack = createDrawerNavigator({
  Editar:{
    screen: Editar,
    navigationOptions:{
      drawerIcon:
      <Icon  name='user' size={20}
      />

    }
  },
  Menu:{
    screen: Teste,
    navigationOptions:{
      drawerIcon:
      <Icon  name='paw' size={20}
      ></Icon>
    }
  },
  
  
     
  },
  {
    defaultNavigationOptions: {
        headerTitle: 'iPet',
  textAlign: "center",
  alignItems: 'center',
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white',
      }
},
  {
    initialRouteName: 'Menu',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#836FFF',
      activeBackgroundColor: '#e6e6e6',
    }
  },
  );
  
  const StackNavigatorContainer = createAppContainer(MainStack);
  
  const AuthStack = createStackNavigator(
    {
      SignIn: SignIn,
      App: StackNavigatorContainer,
      Register: Register,
      // SignUp: RegisterUser
      Servico: Servico,
      Agendamento: Agendamento,
      Card:Card,
      
      Teste: Teste
    },
    {
      initialRouteName: 'Teste',
      headerMode: 'none',
      header: null,
    },
    {
      defaultNavigationOptions: {
          headerTitle: 'iPet',
    textAlign: "center",
    alignItems: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
        }
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
  
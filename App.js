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
import PetInsert from './src/screen/Pet/register';
import Pet from './src/screen/Pet/index';
import EnderecoInsert from './src/screen/Endereco/enderecoInsert';
import EnderecoIndex from './src/screen/Endereco/index';
import EnderecoEdit from './src/screen/Endereco/enderecoEdit';
import PetEdit from './src/screen/Pet/edit';
import PetCompartilhado from './src/screen/Pet/compartilhado'
import Solicitacao from './src/screen/Solicitacoes/index';
import Avalia from './src/screen/Solicitacoes/Avalia';
Icon.loadFont();

import SignIn from './src/screen/SignIn'
import AuthLoadingScreen from './src/screen/SignIn/AuthLoadingScreen'

const MainStack = createDrawerNavigator({
  Menu:{
    screen: Teste,
    navigationOptions:{
      drawerIcon:
      <Icon  name='home' size={20}
      ></Icon>
    }
  },
  
  Editar:{
    screen: Editar,
    navigationOptions:{
      drawerIcon:
      <Icon  name='user' size={20}
      />

    }
  },
  Pet:{
    screen: Pet,
    navigationOptions:{
      drawerIcon:
      <Icon  name='paw' size={20}
      />

    }
  },
  Endereços:{
    screen: EnderecoIndex,
    navigationOptions:{
      drawerIcon:
      <Icon  name='map' size={20}
      />

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
      EnderecoInsert: EnderecoInsert,
      Pet: Pet,
      PetInsert: PetInsert,
      PetEdit: PetEdit,
      PetCompartilhado: PetCompartilhado,
      Endereco: EnderecoIndex,
      EnderecoEdit: EnderecoEdit,
      Avalia: Avalia,
      Solicitacao: Solicitacao,
      
      Teste: Teste
    },
    {
      initialRouteName: 'Pet',
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
  
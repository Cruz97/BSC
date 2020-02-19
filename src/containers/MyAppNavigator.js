import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import Home from './Home';
import Login from './Login';
import Loading from './Loading';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


enableScreens();

const Auth = createStackNavigator({
  Login,
});


const StackApp = createStackNavigator({
  Home,
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth,
      Loading,
      StackApp,
    },
    {
      initialRouteName: 'Loading'
    },
  )
)

export default class MyAppNavigator extends Component{

    constructor(props){
      super(props);
      this.state = {
        appInitialized: true
      }
    }
  
    render(){
        return <AppContainer />;

    }
  }

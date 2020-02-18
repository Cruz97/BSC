import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
//import { crea } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Home from './Home';
import Login from './Login';
import Loading from './Loading';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import config from '../../database/config/configuration'
import Database, {RealmObject} from '../../database';
import schema from '../../database/CloudRealm';
import mainApp from '../../global/AppWrapper'
import Realm from 'realm'


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
      //alert(JSON.stringify(Realm.Sync.User.current,null,4))
      this.state = {
        appInitialized: true
      }
    }


    // componentDidMount(){
    //     let objLocal = Database.LocalDB.get('User',1);
    //     if(objLocal) 
    // }
  
    // componentDidMount(){
    //   const authUrl = config.authUrl;
    //   let creds = Realm.Sync.Credentials.usernamePassword(config.adminUser, config.adminPassword); // createUser = true
    //   const configuration = {
    //     sync: {
    //       fullSynchronization: true,
    //       url: config.realmUrl,
    //     },
    //     schema,
    //   };
  
     
    
  
      
      
    //   if(Realm.Sync.User.current){
    //     Realm.Sync.User.login(authUrl, creds).then(user => {
    //       let configObj = user.createConfiguration(configuration);
    //       Realm.open(configObj).then(realm => {
  
    //         mainApp.setDB(new RealmObject(realm)).initApp();
    //         this.setState({appInitialized: true});
    //       });
    //     });
    //   }
    //   else{
    //     //this.setState({appInitialized: true});
    //     Realm.Sync.User.login(authUrl, creds).then(user => {
    //       let configObj = user.createConfiguration(configuration);
    //       Realm.open(configObj).then(realm => {
    //         //alert(JSON.stringify(realm))
            
    //         mainApp.setDB(new RealmObject(realm)).initApp();
            
    //         this.setState({appInitialized: true});
    //       }).catch(error => {
    //         alert(JSON.stringify(error))
    //       });
    //     }).catch(error => {
    //         alert(JSON.stringify(error))
    //         //this.setState({appInitialized: true});
    //     })
    //   }
    
    // }
    
  
    // renderDefaultView(){
    //   return <View style={{flex: 1, justifyContent: 'center'}}>
    //     <ActivityIndicator color={'#000'} size='large' />
    //   </View>;
    // }
  
    render(){
      //alert(this.state.appInitialized)
      //if(this.state.appInitialized){
        
        return <AppContainer />;

    }
  }

//export const MyAppNavigator = AppContainer;
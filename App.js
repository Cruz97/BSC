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
import Home from './src/containers/Home';
import Login from './src/containers/Login';
import Loading from './src/containers/Loading';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import config from './database/config/configuration';
import {RealmObject} from './database';
import schema from './database/CloudRealm';
import mainApp from './global/AppWrapper';
import Realm from 'realm'
// import MyAppNavigator from './src/containers/MyAppNavigator';
import AppMainNavigator from './src/containers/AppMainNavigator';

enableScreens();

// const Auth = createStackNavigator({
//   Login,
// });


// const StackApp = createStackNavigator({
//   Home,
// });




// const AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       Auth,
//       Loading,
//       StackApp,
//     },
//     {
//       initialRouteName: 'Loading'
//     },
//   )
// )

export default class App extends Component{
  render(){
    return <AppMainNavigator />
  }
} 

// export default class App extends Component{

//   constructor(props){
//     super(props);
//     this.state = {
//       appInitialized: false
//     }
//   }

//   componentDidMount(){
//     const authUrl = config.authUrl;
//     let creds = Realm.Sync.Credentials.usernamePassword(config.adminUser, config.adminPassword); // createUser = true
//     const configuration = {
//       sync: {
//         fullSynchronization: true,
//         url: config.realmUrl,
//       },
//       schema,
//     };

   
  

    
    
//     if(Realm.Sync.User.current == undefined){
//       Realm.Sync.User.login(authUrl, creds).then(user => {
//         let configObj = user.createConfiguration(configuration);
//         Realm.open(configObj).then(realm => {
//           // let objLocal = mainApp.getUserLocal(1);
        
//           //   if(objLocal) this.props.navigation.navigate('StackApp')

//           mainApp.setDB(new RealmObject(realm)).initApp();

//           this.setState({appInitialized: true});
//         });
//       });
//     }
//     else{
//       Realm.Sync.User.login(authUrl, creds).then(user => {
//         let configObj = user.createConfiguration(configuration);
//         Realm.open(configObj).then(realm => {
//           //alert(JSON.stringify(realm))
          
//           mainApp.setDB(new RealmObject(realm)).initApp();
          
//           this.setState({appInitialized: true});
//         }).catch(error => {
//           alert(JSON.stringify(error))
//         });
//       })
//     }
  
//   }
  

//   renderDefaultView(){
//     return <View style={{flex: 1, justifyContent: 'center'}}>
//       <ActivityIndicator color={'#000'} size='large' />
//     </View>;
//   }

//   render(){
//     //alert(this.state.appInitialized)
//     if(this.state.appInitialized){
      
//       return <AppContainer />;
//     }
//     return this.renderDefaultView();
//   }
// }
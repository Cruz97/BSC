import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React, { Component } from 'react';
import {View,ActivityIndicator, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import Home1 from './Home1';
import Login from './Login';
import Database, { RealmObject } from '../../database/index'
// import Loading from './Loading';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import mainApp from '../../global/AppWrapper';
// import {AppTheme} from '../../global/AppTheme';
import { local } from '../../database/LocalRealm';
// import Realm from 'realm';

enableScreens();

const StackApp = createStackNavigator({
  Home1,
});

const Auth = createStackNavigator({
    Login,
  });
  

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
        Auth,
        StackApp,
    },
    {
      initialRouteName: 'Auth'
    },
  )
)

export default class AppMainNavigator extends Component{

   

    constructor(props){
      super(props);
      mainApp.local = new RealmObject(local);
      this.state = {
        appInitialized: false,
        data: null
      }
    }

    componentDidMount(){
        this.getData();
    }


    getData = () => {
        
        fetch('https://josecruzal.000webhostapp.com/WebServices/getData.php')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                let newData = myJson.respuesta[0];
                
                let datalocal = mainApp.local.get('App',1);
                if(datalocal){
                    if(datalocal.version === newData.version)
                        this.setState({appInitialized: true})
                    else
                    mainApp.local.update('App',newData, ()=> this.setState({appInitialized:true}))
                       
                }
                else
                mainApp.local.update('App',newData,()=> this.setState({appInitialized: true}))   
            }).catch(reason => {
                let datalocal = mainApp.local.get('App',1);
                if(datalocal){
                    this.setState({appInitialized: true}) }
                else
                    Alert.alert('Info','Por favor conectese a una red')
                });;
    }
  
    render(){
        if(this.state.appInitialized)
            return <AppContainer />;
        return this.renderDefaultView();

    }

    renderDefaultView(){
        return <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={'#000'} size='large' />
        </View>;
      }
  }

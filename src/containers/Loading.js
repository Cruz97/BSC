import React, { Component } from 'react'
import { Text, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import mainApp from '../../global/AppWrapper' 
import Database, { RealmObject } from '../../database';
import config from '../../database/config/configuration';
import schema from '../../database/CloudRealm';

import { myTheme } from '../assets/styles/Theme';

export class Loading extends Component {

    // componentDidMount(){
    //     //alert('loading')
        

    // }

    constructor(props){
        super(props);
        this.state = {
            reconected: false
        }
    }

    componentDidMount(){
        const authUrl = config.authUrl;
        let creds = Realm.Sync.Credentials.usernamePassword(config.adminUser, config.adminPassword); // createUser = true
        const configuration = {
          sync: {
            fullSynchronization: true,
            url: config.realmUrl,
          },
          schema,
        };
 
        if(Realm.Sync.User.current){
            //alert('if')
          Realm.Sync.User.login(authUrl, creds).then(user => {
            let configObj = user.createConfiguration(configuration);
            Realm.open(configObj).then(realm => {
                Database.CloudDB = new RealmObject(realm);
                let objLocal = Database.LocalDB.get('User',1);
                if(objLocal) this.props.navigation.navigate('StackApp')
                else this.props.navigation.navigate('Auth')
    
              //mainApp.setDB(new RealmObject(realm)).initApp();
              //this.setState({appInitialized: true});
            });
          }).catch(error => {
                let objLocal = Database.LocalDB.get('User',1);
                if(objLocal) this.props.navigation.navigate('StackApp')
                else this.props.navigation.navigate('Auth')
          });
        }
        else{
          //this.setState({appInitialized: true});
          Realm.Sync.User.login(authUrl, creds).then(user => {
            let configObj = user.createConfiguration(configuration);
            Realm.open(configObj).then(realm => {
              //alert(JSON.stringify(realm))
              
             // mainApp.setDB(new RealmObject(realm)).initApp();
             Database.CloudDB = new RealmObject(realm);
             this.props.navigation.navigate('Auth')
              //this.setState({appInitialized: true});
            }).catch(error => {
              Alert.alert('Aviso','Por favor conéctese a una red para sincronizar los datos')
              this.setState({reconected: true})
            });
          }).catch(error => {
            Alert.alert('Aviso','Por favor conéctese a una red para sincronizar los datos')
            this.setState({reconected: true})
              //this.setState({appInitialized: true});
          })
        }
      
      }
      

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               
                  
                        <ActivityIndicator color={'#FAE400'} size='large' />
{/*                 
                //     this.state.reconected ?
                //     (
                //         <TouchableOpacity 
                //         onPress={()=>this.setState({reconected:true})}
                //         style={{
                //             width: '70%',
                //             height: 50, 
                //             paddingHorizontal: '10%',
                //             borderRadius: 25,
                //             justifyContent: 'center',
                //             backgroundColor: myTheme['color-warning-700']}} >
                //             <Text style={{textAlign: 'center',color: '#fff'}}>Reconectar</Text>
                //         </TouchableOpacity>
                //     ):
                //     null
                // } */}
            </View>
        )
    }
}

export default Loading

import React, { Component } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native'
import Database, { RealmObject } from '../../database';
import config from '../../database/config/configuration';
import schema from '../../database/CloudRealm';

export class Loading extends Component {

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
          Realm.Sync.User.login(authUrl, creds).then(user => {
            let configObj = user.createConfiguration(configuration);
            Realm.open(configObj).then(realm => {
                Database.CloudDB = new RealmObject(realm);
                let objLocal = Database.LocalDB.get('User',1);
                if(objLocal) this.props.navigation.navigate('StackApp')
                else this.props.navigation.navigate('Auth')
            });
          }).catch(error => {
                let objLocal = Database.LocalDB.get('User',1);
                if(objLocal) this.props.navigation.navigate('StackApp')
                else this.props.navigation.navigate('Auth')
          });
        }
        else{
          Realm.Sync.User.login(authUrl, creds).then(user => {
            let configObj = user.createConfiguration(configuration);
            Realm.open(configObj).then(realm => {
             Database.CloudDB = new RealmObject(realm);
             this.props.navigation.navigate('Auth')
            }).catch(error => {
              Alert.alert('Aviso','Por favor conéctese a una red para sincronizar los datos')
              this.setState({reconected: true})
            });
          }).catch(error => {
            Alert.alert('Aviso','Por favor conéctese a una red para sincronizar los datos')
            this.setState({reconected: true})
          })
        }
      
      }
      

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator color={'#FAE400'} size='large' />
            </View>
        )
    }
}

export default Loading

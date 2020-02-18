import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity, TextInput, ImageBackground, Image, Alert} from 'react-native'
//import QRCodeScanner from 'react-native-qrcode-scanner';
//import { RNCamera as Camera } from 'react-native-camera';
//import Database from '../database'
import {detectBg} from '../utils/Functions'
import mainApp from '../../global/AppWrapper'
import Database from '../../database'
//import QRCode from 'react-native-qrcode-svg';

export class Login extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        
        this.state = {
            showCamera: false,
            input: '',
            //input: '0991511814001'
        }
    }

    // componentDidMount(){
    //     let objLocal = mainApp.getUserLocal(1);
    //     //alert(JSON.stringify(objLocal))
    //     if(objLocal) this.props.navigation.navigate('StackApp')

    // }

    onChangeText = (text) => {

      let reg = /([^0-9])/g.test(text)
      if(!reg) this.setState({input:text})
      //if(re)

        
    }

    onValidate = () => {
        let input = this.state.input
        // const {navigation} = this.props;
        // const input = navigation.getParam('input',null)

        

        if(input !== ''){
            //let objLocal = mainApp.getUserLocal(1);
            //let objLocal = {}
            //if(objLocal) this.props.navigation.navigate('App')
            //else{
              let objResp = Database.CloudDB.searchObject('User', `code = '${input}'`);
        //alert(JSON.stringify(objResp,null,4))

              if(objResp){
                  let newObjLocal = {
                    uid: 1,
                    uuid: objResp.uuid,
                    name: objResp.name,
                    code: objResp.code,
                    zone: {
                      uuid: objResp.zone.uuid,
                      name: objResp.zone.name
                    }
                  }

              Database.LocalDB.create('User',newObjLocal)
              //mainApp.setUser(objResp);
              this.props.navigation.navigate('StackApp')
          }
          else{
            Alert.alert('ID Incorrecto','Ingrese un ID válido')
            this.setState({input: ''})
            this.props.navigation.navigate('Auth')
              //alert('Codigo incorrecto');
              //this.setState({showCamera: false,input: ''})
          }

        //}


          }
          else{
              Alert.alert('ID Requerido','Por favor ingrese su ID')
            // let objLocal1 = mainApp.getUserLocal(1);
            // if(objLocal1) this.props.navigation.navigate('App')
            // else this.props.navigation.navigate('Auth')
            //this.props.navigation.navigate('LoginGuard')
          }
      //this.props.navigation.navigate('Home',{input: this.state.input});
        // let input = this.state.input;

        // let objLocal = mainApp.getUserLocal(1);
        
        // if(objLocal) this.props.navigation.navigate('App')
        // else{
        //   let objResp = mainApp.getObject('User', `code = '${input}'`);
        // //alert(JSON.stringify(objResp,null,4))

        //   if(objResp){
        //       let newObjLocal = {
        //         uid: 1,
        //         uuid: objResp.uuid,
        //         name: objResp.name,
        //         code: objResp.code,
        //         zone: {
        //           uuid: objResp.zone.uuid,
        //           name: objResp.zone.name
        //         }
        //       }

        //       mainApp.local.create('User',newObjLocal)

        //       mainApp.setUser(objResp);
        //       this.props.navigation.navigate('App')
        //   }
        //   else{
        //       alert('Codigo incorrecto');
        //       this.setState({showCamera: false,input: ''})
        //   }

        // }


        
    }

    onSuccess = (e) => {
        if(e.type === 'QR_CODE'){
          
            this.setState({
                input: e.data,
                showCamera: false,
            })
        }
        //alert(JSON.stringify(e,null,4))
        
      }
      // componentDidMount(){
      //   QRCodeScanner.prototype._setScanning(false)
      // }

    render() {
        //QRCodeScanner
        return (
            // <View style={style.main} >
            <ImageBackground

              source={require('../assets/img/background.jpg')}
              
              resizeMode='cover' 
              style={{
                width: '100%', 
                height: '100%', 
                //display: 'none',
                flex: 1, 
                backgroundColor: '#000'}}
            >
                 <View style={{flex:1, display: this.state.showCamera ? 'flex' : 'none'}}>
               {/* <QRCodeScanner

               reactivate={true}
                    //cameraStyle={{display: 'none'}}
                    //fadeIn={false}
                    
                    onRead={this.onSuccess}
                    flashMode={Camera.Constants.FlashMode.auto}      
                    // topContent={
                    //   <Text style={styles.centerText}>
                    //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                    //   </Text>
                    // }
                    
                    bottomContent={
                    <TouchableOpacity style={style.buttonTouchable}
                        onPress={()=>this.setState({showCamera: false, input: ''})}
                    >
                        <Text style={style.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    }
                /> */}
               </View>
                 <View style={[style.boxlogo,{display: !this.state.showCamera ? 'flex' : 'none'}]}>
                        <Image source={
                          require('../assets/img/icon.png')
                        } style={style.logo}/>
                    </View>
               <View style={{flex:1,justifyContent: 'center',alignItems: 'center', display: !this.state.showCamera ? 'flex' : 'none'}}>
               <TextInput
                value={this.state.input}
                onChangeText={this.onChangeText.bind(this)}
                placeholder='Ingrese su ID'
                maxLength={15}
                placeholderTextColor='#000'
                //autoFocus={true}
                style={{
                    height: 50,
                    fontSize: 20,
                    color: '#000',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    paddingHorizontal: '8%'
                }}
               ></TextInput>
                <View style={{ marginTop: '5%',width: '60%'}}>
                {/* <TouchableOpacity style={style.buttonTouchable}
                    onPress={()=>this.setState({showCamera: true, input: ''})}
                >
                        <Text style={style.buttonText}>Scann QR</Text>
                    </TouchableOpacity> */}
                <TouchableOpacity style={style.buttonTouchable}
                    onPress={()=>this.onValidate()}
                >
                        <Text style={style.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </ImageBackground>
     
        )
    }

}

const style = StyleSheet.create({
    main: {
        flex:1
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
      },
      textBold: {
        fontWeight: '500',
        color: '#000',
      },
      buttonText: {
        fontSize: 17,
        color: 'red',
        fontWeight:'bold',
        textAlign: 'center'
      },
      buttonTouchable: {
        padding: 16,
        backgroundColor: 'yellow',
        //marginHorizontal: '5%',
        //paddingHorizontal: '15%',
        borderRadius: 25
      },
      boxlogo:{
        alignItems: 'center',
       
  
        ...Platform.select({
          ios:{
            marginTop: '30%',
  
          },
          android:{
            marginTop: '30%',
          }
        }),
      },
      logo:{
        resizeMode: 'stretch',
        height: 120,
        width: 120,
      },
})


export default Login

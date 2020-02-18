import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Picker, Right, Image } from 'react-native'
import AppContentItem from '../components/AppContentItem'
import mainApp from '../../global/AppWrapper'
import AlertCustom from '../components/AlertCustom'
import AlertDeleteCustom from '../components/AlertDeleteCustom'
import moment from 'moment'

//import NFC from "react-native-rfid-nfc-scanner";


import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import Database from '../../database'
import { myTheme } from '../assets/styles/Theme'

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera as Camera } from 'react-native-camera';


//NFC.initialize()
//const appcustom = Database.CloudDB.getApp()

// NFC.initialize()

//                     NFC.addListener('scan',
//                     (value)=>{
//                         var status = true;
//                         var code = value.scanned;
//                         var objStatus = mainApp.getStatusCode(code);
//                         alert(JSON.stringify(value,null,4))
//                         // if(objStatus){
//                         //     var newData = {
//                         //         uuid: objStatus.uuid,
//                         //         status: true
//                         //     }
//                         //     if(!objStatus.status) mainApp.updateObject('Parking',newData)
//                         //     else {alert('Ya usado'), status = false}
//                         // }
//                         // else{
//                         //     status = false,
//                         //     code = ""
//                         // }
   
//                         // this.setState({text: code, status})
//                         //alert(JSON.stringify(value,null,4))
//                     }, 
//                     ()=>{alert('ocurrio algo')}) 
                    

class Home extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        //alert(JSON.stringify(props,null,4))
        //const {navigation } = this.props;
        //alert(JSON.stringify(navigation))
        //const user = mainApp.user;
        const events = [...Database.CloudDB.searchAll('Event')];
        const last_event = events[events.length-1];
        //alert(JSON.stringify(last_event,null,4))
        const event = Database.CloudDB.searchObject('Event', `uuid = '${last_event.uuid}'`);
        //alert(JSON.stringify(event,null,4))
        let objLocal = Database.LocalDB.get('User',1);
        //
        //alert(JSON.stringify(objLocal,null,4))
        
        let count = Database.CloudDB.getCount('Log',`user_id.uuid = '${objLocal.uuid}' AND event.uuid = '${last_event.uuid}' AND app_id.uuid = '1' AND zone.uuid = '${objLocal.zone.uuid}' AND status = true`)
        
        this.state = {
            contents: [],
            sections: [],
            array_sections_items: [],
            items: [],
            objsections: {},
            dic: [],
            log: "Ready...",
            text: "",
            zone: objLocal.zone.uuid,
            status: false,
            modalVisible: false,
            user: objLocal,
            event: event,
            picture: null,
            subtitle: '',
            title: '',
            count,
            inputqr: '',
            modalExit: false,
            colorbtn: null,
            last_event
        }
        
    }

    hexInvToDec = (strHex) => {
        var s = strHex.match(/.{1,2}/g).reverse().join('');
        var i, j, digits = [0], carry;
        for (i = 0; i < s.length; i += 1) {
            carry = parseInt(s.charAt(i), 16);
            for (j = 0; j < digits.length; j += 1) {
                digits[j] = digits[j] * 16 + carry;
                carry = digits[j] / 10 | 0;
                digits[j] %= 10;
            }
            while (carry > 0) {
                digits.push(carry % 10);
                carry = carry / 10 | 0;
            }
        }
        return digits.reverse().join('');
        
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

    componentDidMount(){
        
            if(NfcManager.isSupported()){
                try{
                NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
        var status = true;
                        var picture = require('../assets/img/success.png');
                        var title = 'ACCESO PERMITIDO'
                        var subtitle = 'Se permitió el acceso a esta tarjeta'
                        //var code =  "718219029"
                        var colorbtn = myTheme['color-success-500']
                        var code = this.hexInvToDec(tag.id); 
                        var objStatus = Database.CloudDB.getStatusCode(code,this.state.user.zone.uuid);
                        //alert(this.hexInvToDec(tag.id))
                        //alert(code)
                        //alert(JSON.stringify(tag,null,4))
                        //alert(JSON.stringify(objStatus,null,4))
                        if(objStatus){
                            var newData = {
                                uuid: objStatus.uuid,
                                status: true
                            }
                            if(!objStatus.status) {
                                Database.CloudDB.update('Card',newData)
                            }
                            else {
                                title = 'ACCESO DENEGADO'
                                subtitle = 'Se ha denegado el acceso a esta tarjeta'
                                picture = require('../assets/img/error.jpg')
                                status = false, 
                                colorbtn = 'red'
                            }
                        }
                        else{
                            title = 'ACCESO DENEGADO'
                            subtitle = 'No se pudo verificar la tarjeta'
                            status = false,
                            picture = require('../assets/img/error.jpg')
                            colorbtn = 'red'
                        }
                        var date = new Date(); 
                        var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                        var newdate = new Date();
                        
       var now = new Date();                
  var datetime = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate(); 
  datetime += ' '+(now.getHours()-5)+':'+now.getMinutes()+':'+now.getSeconds();
                        let log = {
                            content_id: {"uuid": this.state.last_event.content_id.uuid},
                            app_id: {"uuid": "1"},
                            event: {"uuid": this.state.last_event.uuid},
                            user_id: {"uuid": "1"},
                            zone: {"uuid": this.state.user.zone.uuid},
                            status: status,
                            description: status ? `${code}|Acceso Permitido|${date} `: `${code}|Acceso Denegado|${date}`,
                            date: datetime
                        }
                        Database.CloudDB.create('Log',log)
                        let count = Database.CloudDB.getCount('Log',`user_id.uuid = '${this.state.user.uuid}' AND event.uuid = '${this.state.last_event.uuid}' AND app_id.uuid = '1' AND zone.uuid = '${this.state.zone}' AND status = true`)
                        //alert(count)
                        this.setState({
                            text: code, 
                            status, 
                            modalVisible: true, 
                            picture,
                            title,
                            subtitle,
                            count,
                            colorbtn
                        })
        //NfcManager.setAlertMessageIOS('I got your tag!');
        });
    }catch(ex){
        alert(JSON.stringify(ex))
    }
                
            }
        
        
            
    }

    _cancel = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
      }
    
      _test = async () => {
          //alert('test')
        try {
          await NfcManager.registerTagEvent();
        } catch (ex) {
          //alert( 'ex' +ex);
          //NfcManager.unregisterTagEvent().catch(error=>alert(error.message));
        }
      }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      }

    render() {
        this._test()
        return (
            <ScrollView style={style.main} >
                <AlertCustom 
                    modalVisible={this.state.modalVisible}
                    colorbtn = {this.state.colorbtn}
                    onBackdropPress={()=>{this.setState({modalVisible: false}); }}
                    source={this.state.picture}
                    title={this.state.title}
                    subtitle={this.state.subtitle}
                    textButton='OK'
                    onPress={()=>{
                        this.setState({modalVisible: false})
                        
                    }}

                />

                <AlertDeleteCustom 
                    modalVisible={this.state.modalExit}
                    onBackdropPress={()=>{this.setState({modalExit: false});}}
                    source={require('../assets/img/logout2.png')}
                    title='Atencion!'
                    subtitle='Está seguro de que desea salir de la aplicación?'
                    textOK='Aceptar'
                    textCancel='Cancelar'
                    onPressCancel={()=>{
                        this.setState({modalExit: false})
                    }}
                    onPressOK = {()=>{
                        mainApp.local.deleteAllObjects('User')
                        this.props.navigation.navigate('Auth')
                    }}

                />
                
                <View style={style.header}>
                <Image 
                                source={require('../assets/img/bsc_icon.png')}
                                style={{width:50, height:50, marginHorizontal: '3%'}}
                                resizeMode='stretch'
                                />
                    <Text style={style.textheader}>
                        Control de Acceso
                    </Text>
                    <TouchableOpacity style={{
        textAlign: 'center', backgroundColor: 'red',  height: '100%', justifyContent: 'center', paddingHorizontal: '5%'}}
        onPress={()=>{
           this.setState({modalExit: true})
        }}
        >
            <Text style={{fontSize: 18,
        color: '#fff',marginHorizontal: '5%', textAlign: 'center'}}>Salir</Text>

                    </TouchableOpacity>
                   

                </View>
                
                <View style={style.boxinfo}>
                    
                    <View style={style.boxdata}>
                       <View style={style.iteminfo}>
                       <Text style={style.title}>Localidad:</Text>
                        <Text style={style.value}>{  this.state.user.zone.name }</Text>
                       </View>
                        <View style={style.iteminfo}>
                        <Text style={style.title}>Agente:</Text>
                        <Text style={style.value}>{ this.state.user.name  }  </Text>
                        </View>

                    </View>

                    <View style={{marginTop: '5%', flex:1}}>
                        <View style={style.boxcount}>
                            <Text style={style.count}>{  this.state.count  }</Text>
                        </View>
                    </View>

                </View>


                 <AppContentItem data={this.state.event.content_id}  />


                 <View style={style.boxbtnqr}>
                     <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Screen2', {user: this.state.user})}} style={style.btnqr}>
                        <Text style={style.textbtnqr}>
                            Leer QR
                        </Text>
                     </TouchableOpacity>
                 </View>

                 

                
             

            </ScrollView>
        )
    }
}


const style = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: '#fff',
        //justifyContent:  'center',
        //alignItems: 'center'
        
    },
    header: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around'
        
        // position: 'absolute',
        // top: 0
    },
    boxinfo:{
        //flex:1,
        flexDirection: 'row',
        //justifyContent: 'center',
        //alignContent: 'center',
        //alignItems: 'center'
    },
    boximage:{
        width: '100%',
         height: '50%',
        flex:1,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        
        backgroundColor: 'red',
        marginHorizontal: '4%',
        //marginVertical: '5%',
        
    },
    image:{
        width: '100%',
        height: '100%',
        flex:1,
        marginHorizontal: '5%',
        //textAlign: 'center'
    },
    boxdata:{
        //backgroundColor: 'red',
        flex:2.8,
        marginTop: '5%'
    },
    boxcount:{
        flex:1,
        //backgroundColor: 'yellow',
        marginTop: '2%',
        marginRight: '5%',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
    },

    iteminfo:{
        flexDirection: 'row',
        marginVertical: '3%'
    },
    textheader:{
        fontSize: 18,
        color: '#fff',
        flex:1,
        textAlign: 'center',
        

    },  
    androidPicker: {
        color: '#6D6D6D',
        backgroundColor: '#FFF',
        marginBottom: 20,
        height: 40,
        alignSelf: 'center', 
        justifyContent:'center',
    },
    title: {
        //marginTop: '3%',
        fontSize: 18,
        textAlign: 'left',
        marginHorizontal: '5%'
    },
    value: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        flex:1
        //marginTop: '2%'
    },
    count:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    },
    boxbtnqr:{
        flex:1,
        paddingBottom: '8%',
        display: 'none'
    },
    btnqr:{
        backgroundColor: 'red',
        marginHorizontal: '5%',
        borderRadius: 25,
        paddingVertical: 20,
        alignItems: 'center'
    },
    textbtnqr:{
        color: '#fff'
    }
    

})

export default Home;
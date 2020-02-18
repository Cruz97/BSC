import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Avatar} from 'react-native-elements';
import {Card} from 'react-native-paper';
import moment from 'moment';

//const appcustom = Database.CloudDB.getApp()

export class AppContentItem extends Component {

    componentDidMount(){
       
    }

    render() {
        const {
            style,
            data,

        } = this.props;
        //alert(data.date)
        //alert(JSON.stringify(data.image.url))
        //alert(JSON.stringify(moment.months()[moment(data.date).month()]))
        return (
            <Card style={styleItem.wrapper} onPress={()=>{}} >
                <View style={styleItem.boximage}>
                    <Image 
                        source={{uri: data.image.url}}
                        style={styleItem.image}
                        resizeMode='stretch'
                        />
                    <View style={styleItem.boxButtons}>
                    <Avatar
                        rounded
                        size={40}
                        icon={{name: 'share', size: 20, color: 'gray'}}
                        onPress={() => {}}
                        overlayContainerStyle={{
                            backgroundColor: '#fff', 
                            borderColor: '#b3b3b3',
                            borderWidth: 1
                        }}
                        containerStyle={{marginRight: 15}}
                        />
                     <Avatar
                        rounded
                        size={40}
                        icon={{name: 'heart', type: 'material-community', size: 20, color: 'gray'}}
                        onPress={() => {}}
                        overlayContainerStyle={{
                            backgroundColor: '#fff', 
                            borderColor: '#b3b3b3',
                            borderWidth: 1
                        }}
                        containerStyle={{marginRight: 15}}
                        />

                    </View>
                </View>

                <View style={styleItem.boxDetails}>
                    <View style={styleItem.boxDate}>
                        <Text style={styleItem.dayDate}>{ moment.months()[moment(data.date).month()].substring(0,3) }</Text>
                        <Text style={styleItem.numberDate}> { moment(data.date).format('D')} </Text>
                    </View>
                    <View style={styleItem.boxInfo}>
                        <Text style={styleItem.title}  >{data.title}</Text>
                        <Text style={styleItem.description} numberOfLines={1} >{ data.subtitle }</Text>
                        <Text style={styleItem.summary}  numberOfLines={3}  >{data.summary } </Text>
                    </View>
                   
                    
                </View>
              
            </Card>
        )
    }
}

const styleItem = StyleSheet.create({
    wrapper: {
        marginHorizontal: '3%',
        marginVertical: '10%',
        borderRadius: 10,
        //paddingBottom: 25,
        //flex:1
    },
    boximage:{
        width: '100%',
        height: 210,
        borderRadius: 10,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        overflow: 'hidden',
        
    },
    image:{
        width: null,
        height: null,
        flex:1,
    },
    boxDetails:{
        flexDirection: 'row',
        paddingTop: 15,
        
        height: 120,
        backgroundColor: '#ffff4d'
    },
    boxDate:{
        flex:2,
        alignItems: 'center'
    },
    boxInfo:{
        flex:8,
        //zIndex: 9999
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginRight: '3%'
    },
    description: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: '#333333'
    },
    summary: {
        fontSize: 14,
        marginTop: 5,
        //paddingRight: 5,
        //fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#000',
        //textAlign: 'center'
    },
    boxButtons:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // position: 'absolute',
        // bottom: 10,
        // right: 0,
        display: 'none'
        
    },
    dayDate:{
        color: 'red'
        //color: appcustom.theme_color_secondary,
        
    },
    numberDate: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0
    }
})

export default AppContentItem



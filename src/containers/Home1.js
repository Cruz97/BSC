import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import Database from '../../database/index';

export class Home1 extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        
        this.state = {
            data: null,
            value: null
        }
    }

    componentDidMount(){
        this.saveData()
    }

    

    saveData = () => {
        fetch('https://josecruzal.000webhostapp.com/WebServices/getData.php')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                // alert(JSON.stringify(myJson.respuesta[0],null,4))
                this.setState({data: myJson.respuesta[0]})
                Database.LocalDB.create('App',myJson.respuesta[0])
            })
    }



    render() {
       
        return (
            <View>
                

                <TouchableOpacity
                    style={{
                        marginHorizontal: '5%',
                        marginVertical: '5%',
                        paddingVertical: 20,
                        backgroundColor: 'green'
                    }}

                    onPress={()=>{
                        const value = Database.LocalDB.get('App',1)
                        alert(JSON.stringify(value,null,4))
                    }}
                >
                    <Text style={{color: '#fff', textAlign: 'center'}}>VIEW</Text>
                </TouchableOpacity>
               
             

            </View>
        )
    }
}

export default Home1

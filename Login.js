// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
// } from 'react-native';

// export default class Login extends Component {
//   navegar = () => {
//     this.props.navigator.push({
//       screen: 'instalura.PrimeiraScreen',
//       title: 'Tela Inicial'
//     })
//   }

//   render() {
//     return (
//       <View>
//         <Text>
//           Será que vai??
//         </Text>

//         <Button title="Navegar" onPress={this.navegar}/>
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    Button,
    TextInput,
    AsyncStorage, StyleSheet
} from 'react-native';

const width = Dimensions.get('screen').width;

class Login extends Component{

    constructor(){
        super();
        this.state = {
            usuario: '',
            senha: '',
            mensagem:''
        }
    }


    efetuaLogin = () =>{
        
        const uri = 'http://instalura-api.herokuapp.com/api/public/login';

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }
        fetch(uri, requestInfo)
            .then(res => {
                
                if(res.ok){
                    return res.text();
                }
                throw new Error('Nao foi possivel realizar o login')
            })
            .then(token => {
               
                
                AsyncStorage.setItem('token', token)
                AsyncStorage.setItem('usuario', this.state.usuario)

                this.props.navigator.resetTo({
                    screen: 'App',
                    title: 'Instalura'
                })
            })
            .catch(error => this.setState({mensagem: error.mensagem}))
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput autoCapitalize="none" style={styles.input} placeholder='Usuario...' onChangeText={texto => this.setState({usuario: texto})} />
                    <TextInput autoCapitalize="none" style={styles.input} placeholder='Senha...' onChangeText={texto => this.setState({senha: texto})} />
                    <Button title="Login" onPress={() => this.efetuaLogin()} />
                </View>
                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: width * 0.8,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    titulo:{
        fontWeight: 'bold',
        fontSize: 26
    },
    mensagem:{
        marginTop: 15,
        color: '#e74c3c'
    }
})
export default Login;
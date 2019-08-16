import { Navigation } from 'react-native-navigation';
import Login from './Login';
import App from './App';
import { AsyncStorage } from 'react-native';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('App', () => App);

AsyncStorage.getItem('token')
    .then(token => {
        if(token){
            return {
                screen: 'App',
                title: 'Instalura'
            }
        }
        return {
            screen: 'Login',
            title: 'Login'
        }
    })
    .then(screen => {
        Navigation.startSingleScreenApp({screen: {
            screen: 'Login',
            title: 'Login'
        }});
    })


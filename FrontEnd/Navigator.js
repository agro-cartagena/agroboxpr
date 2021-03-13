import { Actions } from 'react-native-router-flux';

export const goToLogin = () => {
    Actions.login()
}

export const goToRegister = () => {
    Actions.register()
}

export const goToHome = () => {
    Actions.home()
}
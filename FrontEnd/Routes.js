import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import styles from './styles'

import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'

const Routes = () => {
    return(
        <Router sceneStyle={styles.app}>
            <Scene key="root">
                <Scene key="login" component={LoginScreen} title="Login" hideNavBar={true}/>
                <Scene key="register" component={RegisterScreen} title="Register" hideNavBar={true}/>
                <Scene key="home" component={HomeScreen} title="Home" hideNavBar={true} initial={true}/>
            </Scene>
        </Router>
    )
}

export default Routes;

// For a tutorial on how Routes work, refer to:
// https://www.tutorialspoint.com/react_native/react_native_router.htm
import React from 'react'
import { WebView } from 'react-native-webview'

import PopUp from '../../../components/PopUp/PopUp'
import { View } from 'react-native'

import styles from './ATHMStyleSheet'

const ATHM = () => {
    const [showATHM, toggleATHM] = React.useState(false)
    const [url, setURL] = React.useState("")

    const displayATHM = () => {
        return (
            <WebView
                style={{width: '100%', height: '100%'}}
                source={{uri: url}}
            />
        )
    }

    const redirectToATHM = (navState) => {
        // setURL(navState.url)
        // toggleATHM(!showATHM)
    }

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                // style={{width: '100%', height: 100}}
                source={{uri: 'http://10.0.0.6:5000/api/payment/athm'}}
                javaScriptCanOpenWindowsAutomatically={true}
                onNavigationStateChange={redirectToATHM}
                javaScriptEnabled={true}
            />

            <PopUp
                state={showATHM}
                handler={toggleATHM}
                content={displayATHM()}
            />
        </View>
        
    )
}

export default ATHM
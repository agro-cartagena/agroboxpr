import React from 'react'
import { View, Image } from 'react-native'
import styles from './LogoStyleSheet'

const Logo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image
                style={styles.logo}
                source={require('../../assets/agrobox_logo.png')}
            />
        </View>
    )
}

export default Logo
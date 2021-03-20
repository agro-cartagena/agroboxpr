import React from 'react'
import { View, Image } from 'react-native'
import global_styles from '../../styles'

const Logo = () => {
    return (
        <View style={global_styles.logoContainer}>
            <Image
                style={global_styles.logo}
                source={require('../../assets/agrobox_logo.png')}
            />
        </View>
    )
}

export default Logo
import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styles from './BackArrowStyleSheet'

const BackArrow = (props) => {
    return(
        <TouchableOpacity onPress={props.onTouch}>
            <Image 
                source={require('../../assets/icons/ArrowBackward.png')} 
                style={styles.arrow}
            />
        </TouchableOpacity>
    )
}

export default BackArrow
import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styles from './TrashCanStyleSheet'
import Tab from '../Tab/Tab'

const TrashCan = (props) => {
    return(
        <TouchableOpacity onPress={props.onTouch} style={styles.trashCanContainer}>
            <Image 
                source={require('../../assets/icons/Trash(Line).png')} 
                style={styles.trashCan}
            />
        </TouchableOpacity>
    )
}

export default TrashCan
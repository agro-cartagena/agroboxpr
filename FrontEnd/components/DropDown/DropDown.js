import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './DropDownStyleSheet'

const DropDown = (props) => {
    // DropDown initially closed
    const [isTriggered, setIsTriggered] = React.useState(false)

    const trigger = () => {
        setIsTriggered(!isTriggered)
    }

    return(
        <View style={styles.dropMenu}>
            <View style={styles.menu}>
                {/* DropDown Title & Arrow Icon */}
                <Text style={styles.title}>{props.title}</Text>
                <TouchableOpacity style={styles.arrowContainer} onPress={trigger}>
                    <Image 
                        style={styles.arrow}
                        source={isTriggered ? require('../../assets/icons/ArrowDown.png') : require('../../assets/icons/ArrowUp.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* List to display */}
            <View style={[styles.listContainer, isTriggered ? styles.visible : styles.hidden]}>
                {props.list}
            </View>
        </View>
    )
}

export default DropDown
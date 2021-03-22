import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import SquareGrid from 'react-native-square-grid'
import styles from './DropDownStyleSheet'

const DropDown = (props) => {
    // DropDown initially closed
    const [isTriggered, setIsTriggered] = React.useState(false)

    const trigger = () => {
        setIsTriggered(!isTriggered)
    }

    return(
        <TouchableOpacity style={styles.dropMenu} onPress={trigger}>
            <View style={styles.menu}>
                {/* DropDown Title & Arrow Icon */}
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.arrowContainer}>
                    <Image 
                        style={styles.arrow}
                        source={isTriggered ? require('../../assets/icons/ArrowDown.png') : require('../../assets/icons/ArrowUp.png')}
                    />
                </View>
            </View>
            {/* List to display */}
            <View style={[styles.listContainer, isTriggered ? styles.visible : styles.hidden]}>
                {props.list}
                {/* <SquareGrid columns={2} rows={2} items={_products} renderItem={(item)=> render(item)} /> */}
            </View>
        </TouchableOpacity>
    )
}

export default DropDown
import React from 'react'
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'

import styles from './PopUpStyleSheet'

const PopUp = (props) => {
    return (
        <Modal
            transparent={true}
            visible={props.state}
            animationType={'fade'}
        >   
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.overlay} 
                    onPress={() => props.handler(!props.state)}>
                </TouchableOpacity>

                <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                            {props.content}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default PopUp
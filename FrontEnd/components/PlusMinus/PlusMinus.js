import React from 'react'
import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native'
import styles from './PlusMinusStyleSheet'

const PlusMinus = (props) => {

    return(
        <View style={styles.inputContainer}>
            {/* Minus Button */}
            <TouchableOpacity 
                style={styles.iconContainer}
                onPress={props.onMinus}
            >
                <Image
                    source={require('../../assets/icons/minus-sign.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            
            {/* Input field */}
            <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                onChangeText={props.onText}
            >
                <Text>{String(props.placeholder)}</Text>
            </TextInput>

            {/* Plus Button*/}
            <TouchableOpacity 
                style={styles.iconContainer}
                onPress={props.onPlus}
            >
                <Image
                    source={require('../../assets/icons/plus-sign.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    )
}

export default PlusMinus
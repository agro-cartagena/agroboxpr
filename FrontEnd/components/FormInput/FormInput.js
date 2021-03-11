import React from 'react';
import { TextInput } from 'react-native'
import global_styles from '../../styles'

const FormInput = (props) => {

    return (
        <TextInput
            style={[global_styles.textEntry, global_styles.shadow]}
            placeholderTextColor='black'
            autoCorrect={false}
            {...props}
        />    
    )
}

export default FormInput;
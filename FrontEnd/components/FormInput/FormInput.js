import React from 'react';
import { TextInput } from 'react-native'

import global_styles from '../../styles'
import styles from './FormInputStyleSheet'

const FormInput = (props) => {

    return (
        <TextInput
            style={[styles.textEntry, global_styles.shadow]}
            placeholderTextColor='black'
            autoCorrect={false}
            {...props}
        />    
    )
}

export default FormInput;
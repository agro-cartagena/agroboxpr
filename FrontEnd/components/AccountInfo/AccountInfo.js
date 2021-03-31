import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import global_styles from '../../styles';
import styles from './AccountInfoStylesheet';

import { TextInput } from 'react-native-gesture-handler';
import {  } from '../../Navigator'

const AccountInfo = (props) => {
    // const [form, changeForm] = React.useState({
    //     full_name: '',
    //     email: '',
    //     phone: '',
    //     address: '',
    //     city: '',
    //     zipcode: ''
    // })
    return (
        <View 
            
            style={[global_styles.container, styles.formContainer]}>

            <TextInput
                style={styles.form}
                editable
                maxLength={40}
                placeholderTextColor ='white'
                {...props}
            > 
                    </TextInput>
        </View>
    )
}
export default AccountInfo;
import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import global_styles from '../../styles';
import styles from './AccountInfoStylesheet';

import { TextInput } from 'react-native-gesture-handler';

const AccountInfo = (props) => {
    return (
        <View style={[global_styles.container, styles.formContainer]}>

            <Text>Nombre: </Text><TextInput
                style={styles.form}
                editable
                maxLength={40}
            >
                Value
                    </TextInput>
        </View>
    )
}
export default AccountInfo;
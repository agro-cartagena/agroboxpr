import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './CustomerAccountScreenStylesheet';
import global_styles from '../../styles';
import AccountInfo from '../../components/AccountInfo/AccountInfo'

import { TextInput } from 'react-native-gesture-handler';

// Faltar set las rutas, y conectar al DB


const CustomerAccountScreen = () => {
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={[global_styles.container, global_styles.screen]}
            resetScrollToCoords={{x: 0, y: 0}}
        >
            <View style = {styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/agrobox_logo.png')}
                />
            </View>

            <View style = {[global_styles.container, styles.formContainer]}>
               <View style= {styles.fContainer}>
                    <Text style={styles.text}>Nombre: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> Juan del Pueblo</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Email: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> Juan del Pueblo bdfvbj</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Teléfono: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> Juan </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Dirección: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> Juan del Pueblo</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Ciudad: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> Juan del Pueblo</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Estado: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> Juan del Pueblo</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Código postal: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> Juan del Pueblo</AccountInfo>
                </View> 
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style = {[global_styles.button, global_styles.shadow]}>
                    <Text style = {global_styles.text}> Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {[global_styles.button, global_styles.shadow]} >
                    <Text style = {global_styles.text}> Guardar</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>
    )
}

export default CustomerAccountScreen
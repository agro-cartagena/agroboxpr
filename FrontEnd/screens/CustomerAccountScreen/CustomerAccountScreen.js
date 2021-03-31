import React from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './CustomerAccountScreenStylesheet';
import global_styles from '../../styles';
import AccountInfo from '../../components/AccountInfo/AccountInfo'
import users_list from '../../db_mockup/user.db'

import { goToUserInfo } from '../../Navigator';

// Faltar set las rutas, y conectar al DB

// const DATA = [
//     {
//         name = 'Juan del Pueblo',
//         email = 'juanito@gmail.com',
//         phone = '7875555555',
//         address = 'En el pueblo 1',
//         state = 'Puerto Rico',
//         city = 'San Juan',
//         zipcode = '00766'  
//     },
//     {
//         name = 'Fulana',
//         email = 'filana@gmail.com',
//         phone = '7875555555',
//         address = 'En el pueblo 2',
//         state = 'Puerto Rico',
//         city = 'Caguas',
//         zipcode = '00795'
//     }
// ];
// const Item = ({item, onPress, style}) =>(
//     <TouchableOpacity onPress ={onPress}>
//         <Text>{item.name}</Text>
//     </TouchableOpacity>
// )

const CustomerAccountScreen = ({user = {}}) => {
    const {
        name = 'Juan Del Pueblo',
        email = 'juanito@gmail.com',
        phone = '7875555555',
        address = 'En el pueblo 1',
        state = 'Puerto Rico',
        city = 'San Juan',
        zipcode = '00766'
    } = user;
        // goToUserInfo(
        //     props.id,
        //     props.name,
        //     props.email,
        //     props.phone,
        //     props.address,
        //     props.city,
        //     props.zipcode 
        // )
    
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
                        style = {[styles.form, styles.textinput]}>{name} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Email: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]} > {email} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Teléfono: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> {phone} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Dirección: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> {address} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Ciudad: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> {city} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Estado: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> {state}</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Código postal: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}> {zipcode} </AccountInfo>
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
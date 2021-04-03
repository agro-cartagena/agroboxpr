import React from 'react';
import { View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'

import styles from './CustomerAccountScreenStylesheet';
import global_styles from '../../styles';
import AccountInfo from '../../components/AccountInfo/AccountInfo'
import users_list from '../../db_mockup/user.db'
import UserAuthenticationService from '../../services/UserAuthenticationService'

import { goToHome, goToUserInfo } from '../../Navigator';

// const Item = ({item, onPress, style}) =>(
//     <TouchableOpacity onPress ={onPress}>
//         <Text>{item.name}</Text>
//     </TouchableOpacity>
// )

const CustomerAccountScreen = () => {
    const [form, changeForm] = React.useState({
        name: 'Juan Del Pueblo',
        email: 'juanito@gmail.com',
        phone: '7875555555',
        address: 'En el pueblo 1',
        state: 'Puerto Rico',
        city: 'San Juan',
        zipcode: '00766'
    })
        // goToUserInfo(
        //     props.id,
        //     props.name,
        //     props.email,
        //     props.phone,
        //     props.address,
        //     props.city,
        //     props.zipcode 
        // )
    // const onPress = () => cancel;
    const sendCredentials = () => {
        // UserAuthenticationService.instance.sendRegistration(changeForm)
        // Falta hacer el service
    }
    const showAlert = () =>
    Alert.alert(
    "Alerta",
    "Estas seguro de que quieres cancelar los cambios?",
    [
      {
        text: "Cancelar",
        onPress: () => Alert.alert("Cancel Pressed"), //Function goes here?
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );
    return (

        <KeyboardAwareScrollView
            contentContainerStyle={[global_styles.container, global_styles.screen]}
            resetScrollToCoords={{x: 0, y: 0}}
        >
            <Logo style = {styles.logo}/>

            <View style = {[global_styles.container, styles.formContainer]}>
               <View style= {styles.fContainer}>
                    <Text style={styles.text}>Nombre: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]} 
                        textContentType="name"
                        onChangeText = {text => changeForm.name = text}> {form.name}</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Email: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]} 
                        keyboardType = "email-address" 
                        onChangeText = {text => changeForm.email = text}> {form.email}</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Teléfono: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]}
                        keyboardType = "phone-pad" 
                        onChangeText = {text => changeForm.phone = text}> {form.phone} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Dirección: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]} 
                        onChangeText = {text => changeForm.address = text}> {form.address}</AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Ciudad: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]} 
                        onChangeText = {text => changeForm.city = text}>{form.city} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Estado: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]} 
                        onChangeText = {text => changeForm.state = text}> {form.state} </AccountInfo>
                </View>
                <View style= {styles.fContainer}>
                    <Text style={styles.text}>Código postal: </Text><AccountInfo
                        style = {[styles.form, styles.textinput]} 
                        onChangeText = {text => changeForm.zipcode = text}>  {form.zipcode}</AccountInfo>
                </View> 
            </View>

            <View style={styles.buttonContainer}>
                <Button
                        text="Cancelar"
                        onTouch= {showAlert}
                        style = {[styles.buttonContainer,styles.cancelButton]}
                        // onTouch={() => alert(JSON.stringify(boxData))}
                    />
                <Button
                        text="Guardar"
                        // onTouch= {showAlert}
                        style = {[styles.buttonContainer, styles.saveButton]}
                        // onTouch={() => alert(JSON.stringify(boxData))}
                    />

            </View>
        </KeyboardAwareScrollView>
    )
}

export default CustomerAccountScreen

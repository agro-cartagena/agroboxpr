import React from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button/Button'
import Logo from '../../components/Logo/Logo'

import styles from './CustomerAccountScreenStylesheet';
import global_styles from '../../styles';
import AccountInfo from '../../components/AccountInfo/AccountInfo'
import FormInput from '../../components/FormInput/FormInput'
import users_list from '../../db_mockup/user.db'
import UserAuthenticationService from '../../services/UserAuthenticationService'

import { goToHome, goToUserInfo } from '../../Navigator';

const CustomerAccountScreen = () => {

    const [formData, changeFormData] = React.useState({
        full_name: 'Juan Del Pueblo',
        email: 'juanito@gmail.com',
        phone: '7875555555'
    })

    const [addressData, changeAddressData] = React.useState({
        street: 'En el pueblo 1',
        state: 'Puerto Rico',
        city: 'San Juan',
        zipcode: '00766'
    })

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
            resetScrollToCoords={{ x: 0, y: 0 }}
        >
            <Logo style={styles.logo} />

            <View style={[global_styles.container, styles.formContainer]}>
                <View style={styles.fContainer}>
                    <Text style={styles.text}>Nombre: </Text><FormInput
                        // style = {[styles.textinput]} 
                        
                        placeholder = {formData.full_name}
                        // onChangeText = {text => changeFormData.full_name({...formData, full_name: text})}
                        onChangeText={text => changeFormData.full_name = text}
                        textContentType="name"></FormInput>
                </View>
                <View style={styles.fContainer}>
                    <Text style={styles.text}>Email: </Text><FormInput
                        // style = {[styles.form]} 
                        keyboardType="email-address"
                        placeholder = {formData.email}
                        onChangeText={text => changeFormData.phone = text}></FormInput>                
                </View>
                <View style={styles.fContainer}>
                    <Text style={styles.text}>Teléfono: </Text><FormInput
                        // style = {[styles.form]} 
                        keyboardType="phone-pad"
                        placeholder = {formData.phone}
                        onChangeText={text => changeFormData.phone = text}></FormInput>
                </View>
                <View style={styles.fContainer}>
                    <Text style={styles.text}>Dirección: </Text><FormInput
                        // style = {[styles.form]}  
                        placeholder = {addressData.street}
                        onChangeText={text => changeAddressData.address = text}></FormInput>
                </View>
                <View style={styles.fContainer}>
                    <Text style={styles.text}>Ciudad: </Text><FormInput
                        // style = {[styles.form]}  
                        placeholder = {addressData.city}
                        onChangeText={text => changeAddressData.city = text}></FormInput>
                </View>
                <View style={styles.fContainer}>
                    <Text style={styles.text}>Estado: </Text><FormInput
                        // style = {[styles.form]}  
                        placeholder = {addressData.state}
                        onChangeText={text => changeAddressData.state = text}></FormInput>
                </View>
                <View style={styles.fContainer}>
                    <Text style={styles.text}>Código postal: </Text><FormInput
                        // style = {[styles.form]}  
                        placeholder = {addressData.zipcode}
                        onChangeText={text => changeAddressData.zipcode = text}></FormInput>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    text="Cancelar"
                    onTouch={showAlert}
                    style={[styles.buttonContainer, styles.cancelButton]}
                // onTouch={() => alert(JSON.stringify(boxData))}
                />
                <Button
                    text="Guardar"
                    // onTouch= {showAlert}
                    style={[styles.buttonContainer, styles.saveButton]}
                // onTouch={sendCredentials}
                />

            </View>
        </KeyboardAwareScrollView>
    )
}

export default CustomerAccountScreen





{/* <View style = {[global_styles.container, styles.formContainer]}> */ }
//                <View style= {styles.fContainer}>
//                     {/* <Text style={styles.text}>Nombre: </Text> */}
//                     <FormInput
//                         // style = {[styles.textinput]} 
//                         textContentType="name"
//                         onChangeText = {text => changeForm.name = text}> {form.name}</FormInput>
//                 </View>
//                 <View style= {styles.fContainer}>
//                     {/* <Text style={styles.text}>Email: </Text> */}
//                     <FormInput
//                         // style = {[styles.form]} 
//                         keyboardType = "email-address" 
//                         onChangeText = {text => changeForm.email = text}> {form.email}</FormInput>
//                 </View>
//                 <View style= {styles.fContainer}>
//                     {/* <Text style={styles.text}>Teléfono: </Text> */}
//                     <FormInput
//                         // style = {[styles.form]} 
//                         keyboardType = "phone-pad" 
//                         onChangeText = {text => changeForm.phone = text}> {form.phone} </FormInput>
//                 </View>
//                 <View style= {styles.fContainer}>
//                     {/* <Text style={styles.text}>Dirección: </Text> */}
//                     <FormInput
//                         // style = {[styles.form]}  
//                         onChangeText = {text => changeForm.address = text}> {form.address}</FormInput>
//                 </View>
//                 <View style= {styles.fContainer}>
//                     {/* <Text style={styles.text}>Ciudad: </Text> */}
//                     <FormInput
//                         // style = {[styles.form]}  
//                         onChangeText = {text => changeForm.city = text}>{form.city} </FormInput>
//                 </View>
//                 <View style= {styles.fContainer}>
//                     {/* <Text style={styles.text}>Estado: </Text> */}
//                     <FormInput
//                         // style = {[styles.form]}  
//                         onChangeText = {text => changeForm.state = text}> {form.state} </FormInput>
//                 </View>
//                 <View style= {styles.fContainer}>
//                     {/* <Text style={styles.text}>Código postal: </Text> */}
//                     <FormInput
//                         // style = {[styles.form]}  
//                         onChangeText = {text => changeForm.zipcode = text}>  {form.zipcode}</FormInput>
//                 </View> 
//             </View>
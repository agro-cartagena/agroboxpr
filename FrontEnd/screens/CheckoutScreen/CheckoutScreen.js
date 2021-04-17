import React from 'react'
import {Text,View, ScrollView} from 'react-native'
import Button from '../../components/Button/Button'
import BackArrow from '../../components/BackArrow/BackArrow'
import FormInput from '../../components/FormInput/FormInput'

import { goToCart, goToPayment } from '../../Navigator'
import styles from './CheckoutScreenStyleSheet'
import global_styles from '../../styles'

const CheckoutScreen = () => {
    return(
        <ScrollView>
            <View>
                <View style={styles.arrowContainer}>
                    <BackArrow onTouch={goToCart} />
                </View>

                <View style = {[global_styles.container, styles.formContainer]}>
                    {/*  User information */}
                    {/* FormInputs for user information */}
                    <View style= {styles.formInputContainer}>
                        <Text style={styles.text}>Nombre: </Text>
                        <FormInput
                            value="njdbck"
                            // onChangeText={text => changeUserData({ ...userData, full_name: text })}
                            textContentType="name"
                        />
                    </View>
                    <View style= {styles.formInputContainer}>
                        <Text style={styles.text}>Email: </Text>
                        <FormInput
                            value="njdbck"
                            // onChangeText={text => changeUserData({ ...userData, full_name: text })}
                            textContentType="name"
                        />
                    </View>
                    <View style= {styles.formInputContainer}>
                        <Text style={styles.text}>Teléfono: </Text>
                        <FormInput
                            value="njdbck"
                            // onChangeText={text => changeUserData({ ...userData, full_name: text })}
                            textContentType="name"
                        />
                    </View>
                    
                    {/* user address information */}
                    {/* FormInputs */}
                    
                    <View style= {styles.formInputContainer}>
                        <Text style={styles.text}>Dirección: </Text>
                        <FormInput
                            value="njdbck"
                            // onChangeText={text => changeUserData({ ...userData, full_name: text })}
                            textContentType="name"
                        />
                    </View>
                    <View style= {styles.formInputContainer}>
                        <Text style={styles.text}> Ciudad: </Text>
                        <FormInput
                            value="njdbck"
                            // onChangeText={text => changeUserData({ ...userData, full_name: text })}
                            textContentType="name"
                        />
                    </View>
                    <View style= {styles.formInputContainer}>
                        <Text style={styles.text}>Estado: </Text>
                        <FormInput
                            value="njdbck"
                            // onChangeText={text => changeUserData({ ...userData, full_name: text })}
                            textContentType="name"
                        />
                    </View>
                    <View style= {styles.formInputContainer}>
                        <Text style={styles.text}>Zipcode: </Text>
                        <FormInput
                            value="njdbck"
                            // onChangeText={text => changeUserData({ ...userData, full_name: text })}
                            textContentType="name"
                        />
                    </View>
                </View>
            </View>
            <View>
                {/* Button to continue to next screen */}
                <Button
                    onTouch = {goToPayment}
                    text = "Continuar"
                />
            </View>
        </ScrollView>
    )
}
export default CheckoutScreen
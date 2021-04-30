import React from 'react'
import { TouchableOpacity, Image, Text, ScrollView, View, Linking, Platform } from 'react-native'
import {SocialIcon} from 'react-native-elements'
import Logo from '../../../components/Logo/Logo'
import BackArrow from '../../../components/BackArrow/BackArrow'

import global_styles from '../../../styles'
import styles from './ContactUsScreenStyleSheet'
import Navigator from '../../../Navigator'

const ContactUsScreen = () => {
    // handleClick = () => {
    //     Linking.openURL(this.props.url).catch(err => console.error("An error occurred", err));
    //   };
    return(
        <ScrollView>
            <BackArrow onTouch={Navigator.instance.goToMenu}/>
            <Logo/>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.text}>¡Contáctanos a través de nuestras redes sociales!</Text>
                </View>
                <View style={styles.buttonContainer}>
                    
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => Linking.openURL("https:www.facebook.com/agroboxpr").catch(err => console.error('An error occurred', err))}
                    >
                        <SocialIcon
                            title='Facebook'
                            button
                            type='facebook'
                            style={styles.icon}
                            raised={true}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                            let number = '939-280-7836',
                            phone_number = Platform.OS == 'android' ? `tel:${number}` : `telprompt:${number}`

                            Linking.canOpenURL(phone_number)
                                .then(supported => {
                                    if (!supported) {
                                        alert("Teléfono desactivado. Verifique su dispositivo.")
                                    } else {
                                        Linking.openURL(phone_number)
                                    }
                                })
                                .catch(() => alert("Ha ocurrido un error."));
                        }}
                    >
                        <SocialIcon
                            title='WhatsApp'
                            button
                            type='whatsapp'
                            style={[styles.icon, {backgroundColor: '#25D366'}]}
                            raised={true}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => Linking.openURL("https://instagram.com/agroboxpr?igshid=3kcq6xt3w067").catch(err => console.error('An error occurred', err))}
                    >
                        <SocialIcon
                            title='Instagram'
                            button
                            type='instagram'
                            style={styles.icon}
                            raised={true}
                        />

                    </TouchableOpacity>
                
                </View>
            </View>
        </ScrollView>
    )
}

export default ContactUsScreen
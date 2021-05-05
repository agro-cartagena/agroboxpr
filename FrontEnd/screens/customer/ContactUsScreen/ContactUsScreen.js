import React from 'react'
import { TouchableOpacity, Text, ScrollView, View, Linking, Platform } from 'react-native'
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
                            let number = '7872807836',
                                phone_number = Platform.OS == 'android' ? `tel:${number}` : `telprompt:${number}`,
                                url = `whatsapp://send?phone=1${phone_number}`

                            Linking.openURL(url)
                                .catch(err => alert("WhatsApp no está instalado en su móvil."))

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
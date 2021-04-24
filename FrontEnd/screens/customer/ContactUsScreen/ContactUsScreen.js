import React from 'react'
import { TouchableOpacity, Image, Text, ScrollView, View, Linking } from 'react-native'
import {SocialIcon} from 'react-native-elements'
import Logo from '../../../components/Logo/Logo'

import global_styles from '../../../styles'
import styles from './ContactUsScreenStyleSheet'


const ContactUsScreen = () => {
    // handleClick = () => {
    //     Linking.openURL(this.props.url).catch(err => console.error("An error occurred", err));
    //   };
    return(
        <ScrollView>
            <Logo/>
            <View style={styles.container}>
                <Text style={styles.text}> Contáctanos atraves de nuestras redes sociales:</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => Linking.openURL("https:www.facebook.com/agroboxpr").catch(err => console.error('An error occurred', err))}
                    >
                        <SocialIcon
                            style={styles.icon}
                            title='Facebook'
                            button
                            type='facebook'
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => Linking.openURL("https://instagram.com/agroboxpr?igshid=3kcq6xt3w067").catch(err => console.error('An error occurred', err))}
                    >
                        <SocialIcon
                            style={styles.icon}
                            title='Instagram'
                            button
                            type='instagram'
                        />

                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ContactUsScreen
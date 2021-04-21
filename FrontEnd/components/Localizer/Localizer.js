import React from 'react'
import {TouchableOpacity, Image, Alert} from 'react-native'

import styles from './LocalizerStyleSheet'
import GeoCodingService from '../../services/GeoCodingService'

const Localizer = (props) => {
    const askToUseLocation = () => {
        Alert.alert(
            '¿Desea utilizar su localización como dirección?', '',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        navigator.geolocation.getCurrentPosition(
                            async (position) => {
                                const {latitude, longitude} = position.coords
                                const coordinates = {latitude, longitude}

                                props.addressHandler(await GeoCodingService.instance.convertToAddress(coordinates))
                            },

                            (error) => {
                                alert("Ha ocurrido un error. Por favor intente de nuevo.")
                            },

                            { 
                                enableHighAccuracy: true, 
                                timeout: 20000, 
                                maximumAge: 1000 
                            }
                        );
                    }
                }
            ]
        )
    }

    return (
        <TouchableOpacity style={styles.iconContainer} onPress={askToUseLocation}>
            <Image
                style={styles.icon}
                source={require('../../assets/icons/Pin(Fill).png')}
            />
        </TouchableOpacity>
    )
}

export default Localizer
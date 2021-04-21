import React from 'react'
import { TouchableOpacity, View, Text, Alert, Linking, Platform, Clipboard } from 'react-native'

import styles from './OrderCardStyleSheet'
import global_styles from '../../styles'

import UserService from '../../services/UserService'

const OrderCard = (props) => {
    const order_info = props.order

    const fetchAddress = () => {
        const {delivery_address, delivery_city, delivery_state, delivery_zipcode} = order_info
        
        let address = (`${delivery_address} ${delivery_city} ${delivery_state} ${delivery_zipcode}`).split(" ")
        
        return address.join(' ')
    }

    const askToLaunchGPS = async () => {
        if(!UserService.instance.isAdmin())
            return

        const address = fetchAddress(),         
              scheme = Platform.OS == 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=',
              physical_address = scheme + address


        Alert.alert(
            `¿Desea direcciones hacia ${address}?`, '',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        Linking.canOpenURL(physical_address).then(supported => {
                            if (supported) {
                              Linking.openURL(physical_address);
                            } else {
                              alert('Don\'t know how to open URI: ' + url);
                            }
                          });
                    }
                }
            ]
        )
    }

    const askToCall = () => {
        if(!UserService.instance.isAdmin())
            return 

        let number = order_info.order_number,
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
    }

    const askToCopyTransactionId = () => {
        if(!UserService.instance.isAdmin())
            return 

        if(order_info.transaction_id != 'N/A'){
            Alert.alert(
                `${order_info.transaction_id}`, '¿Desea copiar ID de transacción?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    },
                    {
                        text: 'Copiar',
                        onPress: () => {
                            Clipboard.setString(order_info.transaction_id)
                            alert('ID Copiado!')
                        }
                    }
                ]
            )
        }
    }

    return(
        <TouchableOpacity style={[styles.cardContainer, global_styles.shadow]} onPress={()=> alert('hi')}>
            <View style={styles.info}>
                <TouchableOpacity onPress={askToCall}>
                    <Text style={styles.text}>{order_info.order_name}</Text>
                    <Text style={styles.text}>{order_info.order_number}</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={askToLaunchGPS}>
                    <Text style={styles.text}>{order_info.delivery_address}</Text>
                    <Text style={styles.text}>{order_info.delivery_city} {order_info.delivery_state} {order_info.delivery_zipcode}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.info}>
                <TouchableOpacity style={styles.orderInfo} onPress={props.updateStatus}>
                    <Text style={styles.text}>#{order_info._id}</Text>
                    <Text style={styles.text}>{order_info.order_status}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderInfo} onPress={askToCopyTransactionId}>
                    <Text style={styles.text}>{order_info.order_date}</Text>
                    <Text style={styles.text}>${order_info.order_total} - {order_info.payment_method}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default OrderCard
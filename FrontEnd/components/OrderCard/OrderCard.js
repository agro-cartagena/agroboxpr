import React from 'react'
import { TouchableOpacity, View, Text, Alert, Linking, 
        Platform, Clipboard, ScrollView, SectionList } from 'react-native'

import styles from './OrderCardStyleSheet'
import global_styles from '../../styles'

import UserService from '../../services/UserService'
import OrderService from '../../services/OrderService'
import PopUp from '../PopUp/PopUp'

const OrderCard = (props) => {
    const order_info = props.order
    const [displayContent, toggleDisplay] = React.useState(false)
    const [content, setContent] = React.useState([])

    React.useEffect(() => {
        async function fetchData() {
            setContent(await OrderService.instance.getOrderContent(order_info._id))
        }

        fetchData()
    }, [])

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

    const getContent = () => {
        
        async function fetchData() {
            setContent(await OrderService.instance.getOrderContent(order_info._id))
        }

        fetchData()

        const getData = () => {
            return content.map((box) => {
                return {
                    name: box.box_name,
                    quantity: box.box_quantity,
                    price: box.box_accumulated_price,
                    data: box.box_content,
                }
            })
        }

        const renderSectionHeader = ({ section }) => {
            return (
                <View style={styles.sectionHeader}>
                    <View style={{width: '40%', alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={styles.headerText}>{section.name}</Text>
                    </View>
                    
                    
                    <View style={{width: '20%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.headerText}>{`x ${section.quantity}`}</Text>
                    </View>

                    <View style={{width: '40%', alignItems: 'flex-end', justifyContent: 'center'}}>
                        <Text style={styles.headerText}>{`$${section.price}`}</Text>
                    </View>
                </View>
            )
        }

        const renderItem = ({ item }) => {
            return (
                <View style={styles.itemContainer}>
                    <View style={{width: '30%', alignItems: 'flex-start'}}>
                        <Text style={styles.itemText}>{item.product_name}</Text>
                    </View>

                    <View style={{width: '40%', alignItems: 'center'}}>
                        <Text style={styles.itemText}>{`x ${item.product_quantity_box} ${item.product_units}`}</Text>
                    </View>

                    <View style={{width: '30%', alignItems: 'flex-end'}}>
                        <Text style={styles.itemText}>{`$${item.product_price}`}</Text>
                    </View>
                </View>
            )
        }

        return(
            <View style={{width: '100%', height: '100%'}}>
                <ScrollView contentContainerStyle={styles.listContainer}>   
                    <SectionList
                        sections = {getData()}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                        scrollEnabled={true}
                        enabledContentGestureInteraction={false}
                        keyExtractor={(item, index) => index}
                    />
                </ScrollView>

                <View style={styles.textContainer}>
                        <Text>Precio total de la orden: <Text style={{fontWeight: 'bold'}}>${order_info.total_price}</Text></Text>
                        <Text>Método de pago: <Text style={{fontWeight: 'bold'}}>{order_info.payment_method}</Text></Text>
                        <Text>Número de transacción: <Text style={{fontWeight: 'bold'}}>{order_info.transaction_id}</Text></Text>
                </View>
            </View>
        )
    }

    return(
        <View>
            <TouchableOpacity style={[styles.cardContainer, global_styles.shadow]} onPress={() => toggleDisplay(!displayContent)}>
                <View style={styles.info}>
                    <View style={styles.quartet}>
                        <TouchableOpacity onPress={askToCall} style={{alignSelf: 'flex-start'}}>
                            <Text style={styles.text}>{order_info.order_name}</Text>
                            <Text style={styles.text}>{order_info.order_number}</Text>
                        </TouchableOpacity>
                    </View>
                
                    <View style={[styles.quartet, {justifyContent: 'flex-end'}]}>
                        <TouchableOpacity onPress={askToLaunchGPS} style={{alignSelf: 'flex-start'}}>
                            <Text style={styles.text}>{order_info.delivery_address}</Text>
                            <Text style={styles.text}>{order_info.delivery_city} {order_info.delivery_state} {order_info.delivery_zipcode}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.info}>
                    <View style={styles.orderInfo}style={[styles.quartet]}>
                        <TouchableOpacity onPress={props.updateStatus} style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
                            <Text style={styles.text}>#{order_info.uid}</Text>
                            <Text style={styles.text}>{order_info.order_status}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.orderInfo}style={[styles.quartet, {justifyContent: 'flex-end'}]}>
                        <TouchableOpacity onPress={askToCopyTransactionId} style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
                           <Text style={styles.text}>{order_info.order_date}</Text>
                            <Text style={styles.text}>${order_info.total_price} - {order_info.payment_method}</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

            <PopUp
                state={displayContent}
                handler={toggleDisplay}
                content={getContent()}
            />
        </View>
    )
}

export default OrderCard
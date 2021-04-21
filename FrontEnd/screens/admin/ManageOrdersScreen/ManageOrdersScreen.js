import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native'

import styles from './ManageOrdersScreenStyleSheet'
import OrderService from '../../../services/OrderService'

import OrderCard from '../../../components/OrderCard/OrderCard'
import DropDown from '../../../components/DropDown/DropDown'

import BackArrow from '../../../components/BackArrow/BackArrow'
import { goToMenu } from '../../../Navigator'

const ManageOrdersScreen = () => {
    const [orders, setOrders] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {
            setOrders(await OrderService.instance.getUserOrders())
        }

        fetchData()
    }, [])

    const displayOrders = () => {
        const generateCards = (items) => {
            const askToUpdateOrderStatus = (item) => {
                Alert.alert(
                    'Cambiar estatus de orden:', '',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                        },
                        {
                            text: 'En Camino',
                            onPress: async () => {
                                if(await OrderService.instance.updateOrderStatus(item._id, 'En Camino')){
                                    // setOrders(await OrderService.instance.getAllOrders())

                                    item.order_status = 'En Camino'
                                    setOrders({...orders})
                                }
                            }

                        },
                        {
                            text: 'Pendiente',
                            onPress: async () => {
                                if(await OrderService.instance.updateOrderStatus(item._id, 'Pendiente')){
                                    // setOrders(await OrderService.instance.getAllOrders())

                                    item.order_status = 'Pendiente'
                                    setOrders({...orders})
                                }
                            }

                        },
                        {
                            text: 'Completada',
                            onPress: async () => {
                                if(await OrderService.instance.updateOrderStatus(item._id, 'Completada')){
                                    // setOrders(await OrderService.instance.getAllOrders())

                                    item.order_status = 'Completada'
                                    setOrders({...orders})
                                }
                            }
                            
                        }
                    ]
                )
            }
                
            return items.map((item) => 
                <View key={item._id} style={styles.card}>
                    <OrderCard
                        order={item}
                        updateStatus={() => askToUpdateOrderStatus(item)}
                    />
                </View>
            )
        }

        const displaySortIcon = (status) => {
            if(status == 'Pendiente') {

                const sortOrders = (criterion, ascending=1) => {
                    orders[status].sort(
                        (a, b) => {
                           return a[criterion] > b[criterion] ? ascending : -ascending
                        })

                    setOrders({ ...orders })
                }

                const askToSortOrders = () => {
                    Alert.alert(
                        'Ordenar por:', '',
                        [
                            {
                                text: 'Cancelar',
                                style: 'cancel'
                            },
                            {
                                text: 'Pueblo',
                                onPress: () => {
                                    sortOrders('delivery_city')
                                }
                            },
                            {
                                text: 'Precio',
                                onPress: () => {
                                    sortOrders('order_total', -1)
                                }
                            },
                            {
                                text: 'Fecha',
                                onPress: () => {
                                    sortOrders('order_date')
                                }
                            }
                        ]
                    )
                }

                return (
                    <View style={styles.iconHeading} key={'sort'}>
                        <TouchableOpacity style={styles.iconContainer} onPress={askToSortOrders}>
                            <Image
                                style={styles.icon}
                                source={require('../../../assets/icons/Filter(Fill).png')}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }
        }

        return Object.keys(orders).map((catalog) => 
                <View>                
                    <DropDown
                        key={catalog}
                        title={catalog}
                        list={[displaySortIcon(catalog), ...generateCards(orders[catalog])]}
                    />
                </View>
            
        )
    }

    return (
        <ScrollView>
            <BackArrow
                    onTouch={goToMenu}
            />

            <Text style={styles.header}>Manejar Órdenes</Text>

            <View style={styles.cardContainer}>
                {displayOrders()}
            </View>
        </ScrollView>
    )
}

export default ManageOrdersScreen
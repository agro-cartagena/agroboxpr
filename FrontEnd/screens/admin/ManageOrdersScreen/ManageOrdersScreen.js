import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, Alert, TouchableWithoutFeedback, LogBox } from 'react-native'

import styles from './ManageOrdersScreenStyleSheet'
import OrderService from '../../../services/OrderService'

import OrderCard from '../../../components/OrderCard/OrderCard'
import DropDown from '../../../components/DropDown/DropDown'

import BackArrow from '../../../components/BackArrow/BackArrow'
import Navigator from '../../../Navigator'
import Loader from '../../../components/Loader/Loader'

// Warning ignored for final presentation. Should be mitigated as it indicates a memory leak. (MITIGATED BUT LEFT FOR FUTURE REFERENCE)
// LogBox.ignoreLogs([`Can't perform a React state update on an unmounted component.`])

const ManageOrdersScreen = () => {
    const [orders, setOrders] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [uploading, setUploading] = React.useState(false)

    React.useEffect(() => {
        let mounted = true
        async function fetchData() {
            if(mounted) {
                setOrders(await OrderService.instance.getAllOrders())
                setLoading(false) 
            }
            
        }

        fetchData()
        return () => { mounted = false };

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
                                setUploading(true)
                                if(await OrderService.instance.updateOrderStatus(item._id, 'En Camino')){
                                    setOrders(await OrderService.instance.getAllOrders())
                                }
                                setUploading(false)
                            }

                        },
                        {
                            text: 'Pendiente',
                            onPress: async () => {
                                setUploading(true)
                                if(await OrderService.instance.updateOrderStatus(item._id, 'Pendiente')){
                                    setOrders(await OrderService.instance.getAllOrders())
                                }
                                setUploading(false)
                            }

                        },
                        {
                            text: 'Completada',
                            onPress: async () => {
                                setUploading(true)
                                if(await OrderService.instance.updateOrderStatus(item._id, 'Completada')){
                                    setOrders(await OrderService.instance.getAllOrders())
                                }
                                setUploading(false)
                            }
                        }
                    ]
                )
            }
                
            return items.map((item) => 
                <View key={item._id} style={styles.cardContainer}>
                    <View style={styles.card}>
                        <OrderCard
                            order={item}
                            updateStatus={() => askToUpdateOrderStatus(item)}
                        />
                    </View>
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
                                    sortOrders('total_price', -1)
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

        return Object.keys(orders)
            .map((catalog) => 
                <View key={catalog}>                
                    <DropDown
                        key={catalog}
                        title={catalog}
                        list={[displaySortIcon(catalog), ...generateCards(orders[catalog])]}
                    />
                </View>
        )
    }

    return loading 
        ?
            (
                <Loader loading={loading}/>
            )
        :
            (
                <ScrollView>
                    <TouchableWithoutFeedback style={styles.loaderOverlay}>
                        <Loader
                            loading={uploading}
                        />
                    </TouchableWithoutFeedback>

                    <BackArrow onTouch={Navigator.instance.goToMenu}/>

                    <Text style={styles.header}>Manejar Órdenes</Text>

                    <View style={styles.dropDownContainer}>
                        {displayOrders()}
                    </View>
                </ScrollView>
            )
}

export default ManageOrdersScreen
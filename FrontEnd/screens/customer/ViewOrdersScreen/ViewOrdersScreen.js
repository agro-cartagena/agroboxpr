import React from 'react'
import { ScrollView, View, Text } from 'react-native'

import styles from './ViewOrdersScreenStyleSheet'
import OrderService from '../../../services/OrderService'
import UserService from '../../../services/UserService'

import OrderCard from '../../../components/OrderCard/OrderCard'
import DropDown from '../../../components/DropDown/DropDown'
import Navigator from '../../../Navigator'

const ViewOrdersScreen = () => {
    const [orders, setOrders] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {
            if(UserService.instance.isAuthenticated())
                setOrders(await OrderService.instance.getUserOrders())
        }

        fetchData()
    }, [])

    const displayOrders = () => {
        const generateCards = (items) => {
            if(items.length == 0)
                return <Text style={styles.text}>Sus órdenes aparecerán aquí.</Text>

            else
                return items.map((item) => 
                    <View key={item._id} style={styles.card}>
                        <OrderCard
                            order={item}
                        />
                    </View>
                )
        }

        if(!UserService.instance.isAuthenticated())
            return (
                <View style={styles.unauthenticatedTextContainer}>
                    <Text style={styles.unauthenticatedText}>¡Inicie una sesión para ver sus órdenes!</Text>
                    <Text style={styles.redirectionText} onPress={Navigator.instance.goToLogin}>Presione aquí.</Text>
                </View>
            )
        
        else
            return Object.keys(orders).map((catalog) => 
                <DropDown
                    key={catalog}
                    title={catalog}
                    list={generateCards(orders[catalog])}
                />
            )
    }

    return (
        <ScrollView>
            <Text style={styles.header}>Mis Órdenes</Text>

            <View style={styles.cardContainer}>
                {displayOrders()}
            </View>
        </ScrollView>
    )
}

export default ViewOrdersScreen
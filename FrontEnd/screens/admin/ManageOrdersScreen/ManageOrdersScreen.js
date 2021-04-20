import React from 'react'
import { ScrollView, View, Text } from 'react-native'

import styles from './ManageOrdersScreenStyleSheet'
import OrderService from '../../../services/OrderService'

import Logo from '../../../components/Logo/Logo'
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
            return items.map((item) => 
                <View key={item._id} style={styles.card}>
                    <OrderCard
                        order={item}
                    />
                </View>
            )
        }

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
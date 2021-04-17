import React from 'react'
import { ScrollView, View, Text } from 'react-native'

import styles from './ViewOrdersScreenStyleSheet'
import OrderService from '../../../services/OrderService'

import Logo from '../../../components/Logo/Logo'

const ViewOrdersScreen = () => {
    const [orders, setOrders] = React.useState({})

    React.useEffect(() => {
        async function fetchData() {
            setOrders(await OrderService.instance.getOrders())
        }

        fetchData()
    }, [])

    return (
        <ScrollView>
            <Logo/>

            <Text>hello world</Text>
        </ScrollView>
    )
}

export default ViewOrdersScreen
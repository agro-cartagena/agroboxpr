import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import BoxService from '../../services/BoxService'

import BoxCard from '../../components/BoxCard/BoxCard'
import styles from './HomeScreenStyleSheet'
import global_styles from '../../styles'

import box_list from '../../db_mockup/box.db'

const HomeScreen = () => {
    let boxes = []

    const loadBoxes = async () => {
        // BoxService shall be used to fetch box_list over HTTP
        // let box_list = await BoxService.instance.getBoxList()
        // alert(JSON.stringify(box_list))
        box_list.forEach((box) => {
            boxes.push(
                <BoxCard
                    key={box.id}
                    id={box.id}
                    name={box.name}
                    image={box.uri}
                    price={box.price}
                />
            )
        })
    }

    // On screen init
    loadBoxes()

    return (
        <ScrollView>
            <View contentContainerStyle={styles.logoContainer}>
                <Image
                    styles={global_styles.logo}
                    source={require('../../assets/agrobox_logo.png')}
                />
            </View>

            <View>
                {boxes}
            </View>
        </ScrollView>
    )
}

export default HomeScreen
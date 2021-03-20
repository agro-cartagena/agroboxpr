import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import BoxService from '../../services/BoxService'

import BoxCard from '../../components/BoxCard/BoxCard'
import styles from './HomeScreenStyleSheet'
import global_styles from '../../styles'

import box_list from '../../db_mockup/box.db'
import Logo from '../../components/Logo/Logo'

const HomeScreen = () => {
    let boxes = []

    const loadBoxes = async () => {
        // BoxService shall be used to fetch box_list over HTTP
        // let box_list = await BoxService.instance.getBoxList()
        // alert(JSON.stringify(box_list))
        box_list.forEach((box) => {
            boxes.push(
                <View key={box.id} style={styles.cardContainer}>
                    <BoxCard
                        id={box.id}
                        name={box.name}
                        image={box.uri}
                        price={box.price}
                    />
                </View>
            )
        })
    }

    // On screen init
    loadBoxes()

    return (
        <ScrollView style={styles.screen}>
            <Logo/>
            
            <View>
                {boxes}
            </View>
        </ScrollView>
    )
}

export default HomeScreen
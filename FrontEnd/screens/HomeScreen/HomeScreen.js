import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { goToBox } from '../../Navigator'

import BoxService from '../../services/BoxService'
import BoxCard from '../../components/BoxCard/BoxCard'
import box_list from '../../db_mockup/box.db'

import styles from './HomeScreenStyleSheet'
import global_styles from '../../styles'
import Logo from '../../components/Logo/Logo'

const HomeScreen = () => {
    let boxes = []

    const loadBoxes = async () => {
        // BoxService shall be used to fetch box_list over HTTP
        // let box_list = await BoxService.instance.getBoxList()
        // alert(JSON.stringify(box_list))
        box_list.forEach((box) => {
            boxes.push(
                <TouchableOpacity 
                    key={box.id} 
                    style={styles.cardContainer}
                    onPress={() => {
                        goToBox(
                            box.id,
                            box.name,
                            box.image,
                            box.price 
                            )
                        }}
                >
                    <BoxCard
                        id={box.id}
                        name={box.name}
                        image={box.uri}
                        price={box.price}
                    />
                </TouchableOpacity>
            )
        })
    }

    // On screen init
    loadBoxes()

    return (
        <ScrollView style={styles.screen}>
            <Logo/>
            {boxes}
        </ScrollView>
    )
}

export default HomeScreen
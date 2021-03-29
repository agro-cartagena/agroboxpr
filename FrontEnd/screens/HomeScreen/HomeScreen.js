import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { goToViewBox } from '../../Navigator'

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
                    key={box.box_id} 
                    style={styles.cardContainer}
                    onPress={() => { goToViewBox(box) }}
                >
                    <BoxCard
                        id={box.box_id}
                        name={box.box_name}
                        image={box.box_image}
                        price={box.box_price}
                    />
                </TouchableOpacity>
            )
        })
    }

    // On screen init
    loadBoxes()

    return (
        <ScrollView style={global_styles.screen}>
            <Logo/>
            {boxes}
        </ScrollView>
    )
}

export default HomeScreen
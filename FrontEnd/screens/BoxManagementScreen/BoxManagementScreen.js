import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

import global_styles from '../../styles'
import styles from './BoxManagementScreenStyleSheet'

import BackArrow from '../../components/BackArrow/BackArrow'
import Button from '../../components/Button/Button'
import BoxCard from '../../components/BoxCard/BoxCard'

import BoxService from '../../services/BoxService'
import { goToInventoryManagement, goToEditBox } from '../../Navigator'

const BoxManagementScreen = () => {
    const [boxList, setBoxList] = React.useState([])

    React.useEffect(() => {
        async function fetchData() {
            setBoxList(await BoxService.instance.getAllBoxes())
        }

        fetchData()
    }, [])

    const displayBoxes = () => {
        return boxList.map(box => 
            <TouchableOpacity 
                key={box.box_id} 
                style={styles.cardContainer}
                onPress={() => { goToEditBox(box) }}
            >
                <BoxCard
                    id={box.box_id}
                    name={box.box_name}
                    image={box.box_image}
                    price={box.box_price}
                />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={global_styles.screen}>
            <BackArrow
                onTouch={goToInventoryManagement}
            />
            <Text style={[global_styles.text, styles.header]}>Manejar el Inventario (Cajas)</Text>

            <View style={styles.boxCardContainer}>
                {displayBoxes()}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    text="Crear Caja Nueva"
                    onTouch={() => goToEditBox("new")}
                />
            </View>
        </ScrollView>
    )
}

export default BoxManagementScreen
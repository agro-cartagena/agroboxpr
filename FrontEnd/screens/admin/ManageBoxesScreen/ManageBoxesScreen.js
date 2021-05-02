import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import global_styles from '../../../styles'
import styles from './ManageBoxesScreenStyleSheet'

import BackArrow from '../../../components/BackArrow/BackArrow'
import Button from '../../../components/Button/Button'
import BoxCard from '../../../components/BoxCard/BoxCard'

import BoxService from '../../../services/BoxService'
import Navigator from '../../../Navigator'
import Loader from '../../../components/Loader/Loader'

const BoxManagementScreen = () => {
    const [boxList, setBoxList] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchData() {
            setBoxList(await BoxService.instance.getAllBoxes())
            setLoading(false)
        }

        fetchData()
    }, [])

    const displayBoxes = () => {
        return boxList.map(box => 
            <TouchableOpacity 
                key={box._id} 
                style={styles.cardContainer}
                onPress={() => { Navigator.instance.goToEditBox(box) }}
            >
                <BoxCard
                    id={box._id}
                    name={box.box_name}
                    image={box.box_image}
                    price={`$${box.box_price}`}
                    fontSize={{fontSize: RFPercentage(2.5)}}
                    still={true}
                />
                <View style={box.available ? {} : styles.overlay}/>
            </TouchableOpacity>
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
                    <BackArrow
                        onTouch={Navigator.instance.goToInventoryManagement}
                    />

                    <Text style={[global_styles.text, styles.header]}>Manejar el Inventario (Cajas)</Text>

                    <View style={styles.boxCardContainer}>
                        {displayBoxes()}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            text="Crear Caja Nueva"
                            onTouch={() => Navigator.instance.goToEditBox("new")}
                        />
                    </View>
                </ScrollView>
            )
}

export default BoxManagementScreen
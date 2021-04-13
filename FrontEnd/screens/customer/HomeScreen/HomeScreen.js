import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { goToViewBox } from '../../../Navigator'

import BoxService from '../../../services/BoxService'
import BoxCard from '../../../components/BoxCard/BoxCard'

import styles from './HomeScreenStyleSheet'
import global_styles from '../../../styles'
import Logo from '../../../components/Logo/Logo'

const HomeScreen = () => {
    const [ boxList, setBoxList ] = React.useState([])

    React.useEffect(() => {
        async function fetchData() { 
            setBoxList(await BoxService.instance.getAllBoxes()) 
        }

        fetchData()
    }, []);

    const displayBoxes = () => {
        return boxList.map((box) => 
            <TouchableOpacity
                style={styles.card}
                onPress={() => goToViewBox(box)}
                key={box.box_id}
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
        <ScrollView>
            <Logo/>
            <View style={styles.cardContainer}>
                { displayBoxes() }
            </View>
        </ScrollView>
    )
}

export default HomeScreen
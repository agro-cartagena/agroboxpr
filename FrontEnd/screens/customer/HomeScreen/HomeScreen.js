import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Navigator from '../../../Navigator'

import BoxService from '../../../services/BoxService'
import BoxCard from '../../../components/BoxCard/BoxCard'

import styles from './HomeScreenStyleSheet'
import global_styles from '../../../styles'
import Logo from '../../../components/Logo/Logo'

const HomeScreen = () => {
    const [ boxList, setBoxList ] = React.useState([])

    React.useEffect(() => {
        async function fetchData() { 
            setBoxList(await BoxService.instance.getAllAvailableBoxes()) 
        }

        fetchData()
    }, []);

    const displayBoxes = () => {
        return boxList.map((box) => 
            <TouchableOpacity
                style={styles.card}
                onPress={() => Navigator.instance.goToViewBox(box)}
                key={box._id}
            >
                <BoxCard
                    id={box._id}
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
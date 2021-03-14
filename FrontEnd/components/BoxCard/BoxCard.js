import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

import styles from './BoxCardStyleSheet'
import global_styles from '../../styles'

const BoxCard = (props) => {

    return(
        // onPress should redirect to BoxScreen passing props.id as param
        <TouchableOpacity onPress={() => {alert(props.id)}}>
            <Card containerStyle={[styles.card, global_styles.shadow]}>
                {/* Card title will be stored in props.name */}
                {/* <Card.Title>AGROBOX PLUS</Card.Title> */}
                
                <Card.Image 
                    // Image source will be stored in props.image
                    source={props.image}
                    style={styles.image}
                ></Card.Image>
            </Card>
        </TouchableOpacity>
    )
}

export default BoxCard
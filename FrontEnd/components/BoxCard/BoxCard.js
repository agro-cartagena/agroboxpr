import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'

import styles from './BoxCardStyleSheet'
import global_styles from '../../styles'
import { goToBox } from '../../Navigator'

const BoxCard = (props) => {

    return(
        // onPress should redirect to BoxScreen passing props.id as param
        <TouchableOpacity onPress={() => {
                goToBox(
                    props.id,
                    props.name,
                    props.image,
                    props.price 
                )
            }}>
            <Card containerStyle={[styles.card, global_styles.shadow, styles.radius]}>
                {/* Card title will be stored in props.name */}
                {/* <Card.Title>{props.name}</Card.Title> */}
                
                <Card.Image 
                    source={props.image}
                    style={[styles.image, styles.radius]}
                ></Card.Image>
            </Card>
        </TouchableOpacity>
    )
}

export default BoxCard
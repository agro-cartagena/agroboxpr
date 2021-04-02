import React from 'react'
import { Card } from 'react-native-elements'

import styles from './BoxCardStyleSheet'
import global_styles from '../../styles'

const BoxCard = (props) => {

    return(
        <Card containerStyle={[styles.card, global_styles.shadow, styles.radius]}>
            {/* Card title will be stored in props.name */}
            {/* <Card.Title>{props.name}</Card.Title> */}
            
            <Card.Image 
                source={props.image}
                style={[styles.image, styles.radius]}
            ></Card.Image>
        </Card>
    )
}

export default BoxCard
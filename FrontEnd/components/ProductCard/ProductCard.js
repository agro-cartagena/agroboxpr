import React from 'react'
import { Text, View, Image} from 'react-native'
import { Card } from 'react-native-elements'

import styles from './ProductCardStyleSheet'
import global_styles from '../../styles'

const ProductCard = (props) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.productName]}>{props.name}</Text>
                <Text style={[styles.text, styles.productQuantity]}>{props.quantity} {props.units}</Text>
            </View>
            <Card containerStyle={[styles.card, styles.radius, global_styles.shadow]}>
                <Card.Image 
                    source={require('../../assets/products/Broccoli.jpeg')}
                    style={[styles.image, styles.radius]}
                />
            </Card>
        </View>
    )
}

export default ProductCard
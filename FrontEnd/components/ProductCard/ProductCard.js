import React from 'react'
import { Text, View, Image} from 'react-native'
import { Card } from 'react-native-elements'

import styles from './ProductCardStyleSheet'
import global_styles from '../../styles'

const ProductCard = () => {
    return (
        <Card containerStyle={styles.card}>
            <Card.Image 
                source={require('../../assets/products/Broccoli.jpeg')}
                style={styles.image}
                // resizeMode="contain"
            />
        </Card>
    )
}

export default ProductCard
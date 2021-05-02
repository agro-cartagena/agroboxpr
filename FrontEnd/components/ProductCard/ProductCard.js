import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import CachedImage from '../CachedImage/CachedImage'

import ImageService from '../../services/ImageService'
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
                <CachedImage 
                    source={{uri: ImageService.instance.getURL(props.uri)}}
                    imageStyle={[styles.image]}
                />
            </Card>
        </View>
    )
}

export default ProductCard
import React from 'react'
import { Text, View, ActivityIndicator} from 'react-native'
import { Card } from 'react-native-elements'

import ProductService from '../../services/ProductService'
import styles from './ProductCardStyleSheet'
import global_styles from '../../styles'

const ProductCard = (props) => {
    const [imageLoading, setImageLoading] = React.useState(true)

    return (
        <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.productName]}>{props.name}</Text>
                <Text style={[styles.text, styles.productQuantity]}>{props.quantity} {props.units}</Text>
            </View>
            <Card containerStyle={[styles.card, styles.radius, global_styles.shadow]}>
                <Card.Image 
                    source={{uri: `${ProductService.instance.getURL()}image/file/${props.uri}`}}
                    style={[styles.image]}
                    onLoadEnd={() => setImageLoading(false)}
                >
                    {
                        imageLoading 
                            && 
                                <ActivityIndicator
                                    size="large"
                                    color="#8C0634"
                                />
                    }
                </Card.Image>
            </Card>
        </View>
    )
}

export default ProductCard
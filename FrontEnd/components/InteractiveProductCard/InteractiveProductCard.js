import React from 'react'
import { View } from 'react-native'

import styles from './InteractiveProductCardStyleSheet'
import ProductCard from '../../components/ProductCard/ProductCard'
import PlusMinus from '../../components/PlusMinus/PlusMinus'

const InteractiveProductCard = (props) => {
    return (
        <View>
            <ProductCard
                name={props.product.product_name}
                quantity={props.product.product_quantity_stock}
                units={props.product.product_units}
                uri={props.product.product_image}
            />

            <View style={styles.inputContainer}>
                <PlusMinus
                    onMinus={props.onMinus}
                    onText={props.onText}
                    onPlus={props.onPlus}
                    placeholder={props.placeholder}
                />
            </View>
        </View>
    )
}

export default InteractiveProductCard
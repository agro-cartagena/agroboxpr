import React from 'react'
import { View } from 'react-native'

import styles from './InteractiveProductCardStyleSheet'
import ProductCard from '../../components/ProductCard/ProductCard'
import PlusMinus from '../../components/PlusMinus/PlusMinus'

const InteractiveProductCard = (props) => {
    return (
        <View>
            <ProductCard
                name={props.product.name}
                quantity={props.product.quantity}
                units={props.product.units}
                uri={props.product.image}
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
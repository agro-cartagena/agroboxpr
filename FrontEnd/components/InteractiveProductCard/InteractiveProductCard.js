import React from 'react'
import { View } from 'react-native'

import styles from './InteractiveProductCardStyleSheet'
import ProductCard from '../../components/ProductCard/ProductCard'
import PlusMinus from '../../components/PlusMinus/PlusMinus'

const InteractiveProductCard = (props) => {
    const [quantity, setQuantity] = React.useState(props.placeholder)

    const increaseQuantity = () => {
        if(quantity == props.product.product_quantity_stock)
            alert("Cantidad máxima alcanzada.")

        else{
            props.onPlus()
            setQuantity(quantity + 1)
        }
    }

    const decreaseQuantity = () => {
        if(quantity >= 1)
            setQuantity(quantity - 1)
        
        else
            setQuantity(0)

        props.onMinus()
    }

    const changeQuantity = (text) => {
        let newQuantity = Number(text)
        if(newQuantity > props.product.product_quantity_stock){
            alert("Cantidad máxima excedida.")
        }

        else if(newQuantity <= 0){
            props.onText(0)
            setQuantity(0)
        }

        else{
            props.onText(newQuantity)
            setQuantity(newQuantity)
        }
    }

    return (
        <View style={quantity > 0 ? {/*styles.activeBorder*/} : styles.inactiveBorder}>
            <ProductCard
                name={props.product.product_name}
                quantity={props.product.product_quantity_stock}
                units={props.product.product_units}
                uri={props.product.product_image}
            />

            <View style={styles.inputContainer}>
                <PlusMinus
                    onMinus={decreaseQuantity}
                    onText={changeQuantity}
                    onPlus={increaseQuantity}
                    placeholder={quantity}
                />
            </View>
        </View>
    )
}

export default InteractiveProductCard
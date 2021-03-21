import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Card } from 'react-native-elements'
import Button from '../../components/Button/Button'

import styles from './BoxScreenStyleSheet';
import global_styles from '../../styles'
import { goToHome } from '../../Navigator'

import ProductCard from '../../components/ProductCard/ProductCard'
import BoxService from '../../services/BoxService'
import CartService from '../../services/CartService'

import products_list from '../../db_mockup/product.db'
import PlusMinus from '../../components/PlusMinus/PlusMinus'
import BackArrow from '../../components/BackArrow/BackArrow'

// Route parameters are stored in props.params object
// i.e., alert(props.params.box_name)
const BoxScreen = (props) => {
    let products = []

    // Quantity of Box to be added to Cart. Default value is 1.
    const [quantity, setQuantity] = React.useState(1)

    const loadProducts = async (box_id) => {
        // let products_list = await BoxService.instance.getBoxContentWith(box_id)
        products_list.forEach((product) => {
            products.push(
                <View style={styles.productCard} key={product.name}>
                    <ProductCard
                        name={product.name}
                        quantity={product.quantity}
                        units={product.units}
                        uri={product.image}
                    />
                </View>
            )
        })
    }
    
    const verifyQuantity = () => {
        alert(quantity)
        if(quantity < 1 || quantity > 99)
            alert("Cantidad de cajas debe ser entre 1 a 99 cajas.")

        else{
            let item = {
                box_id: props.params.box_id,
                box_name: props.params.box_name,
                box_image: props.params.box_image,
                box_price: props.params.box_price,
                box_quantity: quantity
            }

            CartService.instance.addToCart(item)
            // alert(JSON.stringify(item))
        }
    }

    // On component init.
    loadProducts(props.params.box_id)

    return (
        <KeyboardAwareScrollView 
            style={global_styles.screen}
        >

            {/* GO BACK ARROW */}
            <View style={styles.arrowContainer}> 
                <BackArrow onTouch={goToHome}/>
            </View>

            {/* BOX CARD */}
            <Text style={[styles.text, styles.cardText, styles.cardTitle]}>{props.params.box_name}</Text>
            <Card containerStyle={[styles.card, global_styles.shadow]}>
                {/* <Card.Image source={props.params.box_image}> */}
                <Card.Image 
                    style={styles.imageRadius}
                    source={props.params.box_image}
                    resizeMode="stretch"
                />
                <Text style={[styles.text, styles.cardText]}>Precio: <Text style={{color: 'rgb(252,0,29)'}}>${props.params.box_price}</Text></Text>
            </Card>
            <Text style={styles.text}>Te incluye:</Text>

            {/* PRODUCT LIST */}
            <View style={styles.productContainer}>
                {products}
            </View>

            {/* ADD TO CART */}
            <View style={styles.addToCartContainer}>

                {/* Input field */}
                <View style={styles.plusMinusContainer}>
                    <PlusMinus
                        onMinus={() => { if(quantity > 1) setQuantity(quantity-1) }}
                        onPlus={()=>{ if(quantity < 100) setQuantity(quantity+1) }}
                        onText={(quantity) => { setQuantity(Number(quantity)) }}
                        placeholder={quantity}
                    />
                </View>

                {/* Add Button */}
                <Button
                    onTouch={verifyQuantity}
                    text="Agregar"
                />
            </View>

        </KeyboardAwareScrollView>
    )
}

export default BoxScreen
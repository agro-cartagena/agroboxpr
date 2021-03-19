import React from 'react';
import { ScrollView, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements'

import styles from './BoxScreenStyleSheet';
import global_styles from '../../styles'
import { goToHome } from '../../Navigator'

import ProductCard from '../../components/ProductCard/ProductCard'
import BoxService from '../../services/BoxService'
import products_list from '../../db_mockup/product.db'

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
                <ProductCard
                    key={product.name}
                    name={product.name}
                    quantity={product.quantity}
                    units={product.units}
                    // image={product.uri}
                />
            )
        })
    }
    
    // On component init.
    loadProducts(props.params.box_id)

    return (
        <KeyboardAwareScrollView 
            style={styles.screen}
        >

            {/* GO BACK ARROW */}
            <TouchableOpacity onPress={goToHome}>
                <Image 
                    source={require('../../assets/icons/ArrowBackward.png')} 
                    style={styles.arrow}
                />
            </TouchableOpacity>

            {/* BOX CARD */}
            <Text style={[styles.text, styles.cardText, styles.cardTitle]}>{props.params.box_name}</Text>
            <Card containerStyle={[styles.card, global_styles.shadow]}>
                {/* <Card.Image source={props.params.box_image}> */}
                <Card.Image 
                    style={styles.imageRadius}
                    source={require('../../assets/boxes/AgroBox.jpeg')}
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
                
                <View style={styles.inputContainer}>
                    {/* Minus Button */}
                    <TouchableOpacity 
                        style={styles.iconContainer}
                        onPress={() => { if(quantity > 1) setQuantity(quantity-1) }}
                    >
                        <Image
                            source={require('../../assets/icons/minus-sign.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    
                    {/* Input field */}
                    <TextInput
                        style={styles.inputField}
                        keyboardType="numeric"
                        onChangeText={(quantity) => { setQuantity(Number(quantity)) }}
                    >
                        <Text>{String(quantity)}</Text>
                    </TextInput>

                    {/* Plus Button*/}
                    <TouchableOpacity 
                        style={styles.iconContainer}
                        onPress={()=>{ if(quantity < 100) setQuantity(quantity+1) }}
                    >
                        <Image
                            source={require('../../assets/icons/plus-sign.png')}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                </View>

                {/* Add Button */}
                <TouchableOpacity 
                    style={[global_styles.button, global_styles.shadow, styles.button]}
                    onPress={ () => {
                        if(quantity < 1 || quantity > 99)
                            alert("Cantidad de cajas debe ser entre 1 a 99 cajas.")

                        else
                            // If quantity is valid, 
                            // CartService adds props.params.box_id and quantity to Cart.
                            alert(quantity)
                    }}
                >
                    <Text style={global_styles.text}>Agregar</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAwareScrollView>
    )
}

export default BoxScreen
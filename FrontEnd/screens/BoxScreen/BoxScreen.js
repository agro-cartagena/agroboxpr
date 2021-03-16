import React from 'react';
import { ScrollView, View, Image, Button, Text, TouchableOpacity } from 'react-native';
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

    const loadProducts = async (bid) => {
        // let products_list = await BoxService.instance.getBoxContentWith(bid)
        products_list.forEach((product) => {
            products.push(
                <ProductCard
                    key={product.id}
                    name={product.name}
                    quantity={product.quantity}
                    units={product.units}
                    // image={uri}
                />
            )
        })
    }
    
    // On component init.
    loadProducts(props.params.box_id)

    return (
        <ScrollView style={styles.screen}>
            <TouchableOpacity onPress={goToHome}>
                <Image 
                    source={require('../../assets/icons/ArrowBackward.png')} 
                    style={styles.arrow}
                />
            </TouchableOpacity>

            <Card containerStyle={[styles.card, styles.radius, global_styles.shadow]}>
                {/* <Card.Title>{props.params.box_name}</Card.Title> */}

                {/* <Card.Image source={props.params.box_image}> */}
                <Card.Image 
                    source={require('../../assets/boxes/AgroBox.jpeg')}
                    style={styles.radius}
                    resizeMode="stretch"
                />
                {/* <Text>Precio: ${props.params.box_price}</Text> */}
            </Card>

            <Text style={styles.text}>Te incluye:</Text>

            <View style={styles.productContainer}>
                {products}
            </View>

        </ScrollView>
    )
}

export default BoxScreen
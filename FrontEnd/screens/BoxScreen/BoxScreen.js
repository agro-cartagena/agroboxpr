import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'

import styles from './BoxScreenStyleSheet';
import global_styles from '../../styles'
import { goToHome } from '../../Navigator'

import ProductCard from '../../components/ProductCard/ProductCard'

// Route parameters are stored in props.params object
// i.e., alert(props.params.box_name)
const BoxScreen = (props) => {

    return (
        <ScrollView>
            <ProductCard/>

            <TouchableOpacity onPress={goToHome}>
                <Image 
                    source={require('../../assets/icons/ArrowBackward.png')} 
                    style={styles.arrow}
                />
            </TouchableOpacity>

            <Card>
                <Card.Title>{props.params.box_name}</Card.Title>
                <Card.Divider/>

                {/* <Card.Image source={props.params.box_image}> */}
                <Card.Image 
                    source={require('../../assets/boxes/AgroBox.jpeg')}
                    resizeMode="stretch"
                />
                <Text>Precio: ${props.params.box_price}</Text>
            </Card>

        </ScrollView>
    )
}

export default BoxScreen
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
// import { Card, ListItem, Button, Icon } from 'react-native-elements'

import styles from './BoxesCardStyleSheet';

export default class BoxesCard extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.cardContainer}>
                    <Image style = {styles.cardImage} source = {require('../../assets/agrobox_logo.png')}/>
                    <Text style={styles.cardtext}>AGROBOX</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

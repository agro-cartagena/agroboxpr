import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import styles from './BoxesCardStyleSheet';
import global_styles from '../../styles';

export default class BoxesCard extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.cardContainer}>
                    <Image style = {styles.cardImage} source = {require('../../assets/agrobox_logo.png')}/>
                    <Text style={styles.cardtext}>AGROBOX</Text>
                </TouchableOpacity>
                {/* <Card containerStyle = {[styles.container, styles.cardContainer]}> 
                    <Card.Image 
                        source={require('../../assets/agrobox_logo.png')}
                        style = {[styles.container,styles.boxImg]}> */}

                        {/* <Text style={styles.txt}>
                            The idea with React Native Elements is more about component structure than actual design.
                        </Text> */}
                        {/* <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='VIEW NOW' /> */}
                    {/* </Card.Image>
                    <Card.Divider/>
                    <Card.Title style = {styles.txt}>AGROBOX</Card.Title>
                </Card> */}
            </View>
        )
    }

}

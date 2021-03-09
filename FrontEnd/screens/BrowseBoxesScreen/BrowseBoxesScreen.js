import React from 'react';
import { ScrollView, View, Image, TextInput, Button, Text, TouchableOpacity } from 'react-native';

import styles from './BrowseBoxesScreenStyleSheet';

// const user = require('FrontEnd/screens/PremadeBoxesScreen/PremadeDBTest.json');

export default class BrowseBoxesScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle = {[styles.container, styles.screen]}>
                <View>
                    <Text>This is a test!!</Text>
                    {/* <Text> user.name</Text> */}
                </View>
            </ScrollView>
        )
    }
}
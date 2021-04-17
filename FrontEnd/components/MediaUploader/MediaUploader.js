import React from 'react'
import { View, Image, TouchableOpacity, Text, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import styles from './MediaUploaderStyleSheet'
import global_styles from '../../styles'

const MediaUploader = (props) => {

    const handleUpload = async () => {
        // Verify permissions to access photo library. 
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted')
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        else {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {
                let url = Platform.OS == 'ios' ? result.uri.replace('file://', '') : result.uri
                alert(url)
                props.setMedia({
                    uri: result.uri,
                    type: result.type, 
                });
            }
        }
        
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleUpload}>
            <View style={[styles.imageContainer, global_styles.shadow]}>
                <Image
                    // source={props.media.uri ? {uri: props.media.url} : require('../../assets/icons/Upload.png')}
                    source = {'http://10.0.0.6:5000/image/file/5e5d13021a917d2198b9c3ef06094450'}
                    style={props.media.uri ? {...styles.image, resizeMode: 'stretch'} : {...styles.image, resizeMode: 'center'}}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Añadir foto nueva o modificar foto existente</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MediaUploader
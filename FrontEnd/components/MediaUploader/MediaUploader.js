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
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true
            });

            if (!result.cancelled) {
                let url = Platform.OS == 'ios' ? result.uri.replace('file://', '') : result.uri
                props.setMedia({...props.media, url: url});
            }
        }
        
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleUpload}>
            <View style={[styles.imageContainer, global_styles.shadow]}>
                <Image
                    source={props.media.url ? {uri: props.media.url} : require('../../assets/icons/Upload.png')}
                    style={props.media.url ? {...styles.image, resizeMode: 'stretch'} : {...styles.image, resizeMode: 'center'}}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Añadir foto nueva o modificar foto existente</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MediaUploader
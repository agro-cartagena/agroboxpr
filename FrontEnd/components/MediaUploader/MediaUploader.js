import React from 'react'
import { View, Image, TouchableOpacity, Text, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import styles from './MediaUploaderStyleSheet'
import global_styles from '../../styles'

const MediaUploader = (props) => {
    const url = 'http://10.0.0.6:5000/api/image/file'

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
                // alert(JSON.stringify(result))
                // let url = Platform.OS == "ios" ? result.uri.replace('file://', '') : result.uri
                // props.setMedia(url)

                props.setMedia(result.base64);
            }
        }
        
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleUpload}>
            <View style={[styles.imageContainer, global_styles.shadow]}>
                <Image
                    source={props.media ? {uri: `data:image/png;base64,${props.media}`} : require('../../assets/icons/Upload.png')}
                    // source={{uri: 'http://10.0.0.6:5000/api/image/file/e7766494d6b731821aa4eaa0ce25c5ea'}}
                    // source={props.media ? {uri: `${url}/${props.media}`} : require('../../assets/icons/Upload.png')}
                    style={props.media ? {...styles.image, resizeMode: 'stretch'} : {...styles.image, resizeMode: 'center'}}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Añadir foto nueva o modificar foto existente</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MediaUploader
import React from 'react'
import { View, Image, TouchableOpacity, Text, Platform } from 'react-native'
import CachedImage from '../CachedImage/CachedImage'
import * as ImagePicker from 'expo-image-picker';

import ImageService from '../../services/ImageService'
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
                quality: 1
            });

            if (!result.cancelled) {
                // alert(JSON.stringify(result))
                let url = Platform.OS == "ios" ? result.uri.replace('file://', '') : result.uri

                props.setMedia({
                    name: 'image.jpeg',
                    type: result.type,
                    uri: url
                });
            }
        }
        
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleUpload}>
            <View style={[styles.imageContainer, global_styles.shadow]}>
                {
                    typeof props.media != 'string'
                        ? 
                            props.media.hasOwnProperty('uri')
                                ?
                                    (
                                        <Image
                                            source={{uri: props.media.uri}}
                                            style={styles.image}
                                            resizeMode='stretch'
                                        />
                                    )
                                :
                                    (
                                        <Image
                                            source={require('../../assets/icons/Upload.png')}
                                            style={styles.image}
                                            resizeMode='center'
                                        />
                                    )
                        :
                            (
                                <CachedImage
                                    source={{uri: ImageService.instance.getURL(props.media)}}
                                    imageStyle={styles.image}
                                    resizeMode='stretch'
                                />
                            )
                }
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Añadir foto nueva o modificar foto existente</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MediaUploader
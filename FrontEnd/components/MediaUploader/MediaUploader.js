import React from 'react'
import { View, ImageBackground, TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import ProductService from '../../services/ProductService'
import styles from './MediaUploaderStyleSheet'
import global_styles from '../../styles'

const MediaUploader = (props) => {
    const url = 'http://10.0.0.6:5000/api/image/file'
    const [loading, setLoading] = React.useState(true)

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

    const getMediaSource = () => {
        if(typeof props.media != 'string') { 
            if(props.media.hasOwnProperty('uri'))
                return {uri: props.media.uri}
            
            else
                return require('../../assets/icons/Upload.png')
        } else
            return {uri: `${ProductService.instance.getURL()}image/file/${props.media}`}
    }

    const getMediaResize = () => {
        if(typeof props.media != 'string' && !props.media.hasOwnProperty('uri'))
            return 'center'

        return 'stretch'
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleUpload}>
            <View style={[styles.imageContainer, global_styles.shadow]}>
                <ImageBackground
                    source={getMediaSource()}
                    style={styles.image}
                    resizeMode={getMediaResize()}
                    onLoadEnd={() => setLoading(false)}
                >
                    {
                        loading
                            &&
                                <ActivityIndicator
                                    size="large"
                                    color="#8C0634"
                                />
                    }
                </ImageBackground>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Añadir foto nueva o modificar foto existente</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MediaUploader
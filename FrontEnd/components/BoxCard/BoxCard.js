import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './BoxCardStyleSheet'
import global_styles from '../../styles'

const BoxCard = (props) => {

    const media = {
        thumbnail: require('../../assets/gifs/animated-box-thumbnail.png'),
        gif: require('../../assets/gifs/animated-box-nobg.gif')
    }

    const [mediaSource, setMediaSource] = React.useState(media.thumbnail)

    const renderAnimation = (param) => {
        setMediaSource()
        setTimeout(() => {
            param == "start" ? setMediaSource(media.gif) : setMediaSource(media.thumbnail)
        }, 0)
    }

    return(
        <View style={styles.container} >
            <View style={styles.textContainer}>
                <Text style={[styles.text]}>{props.name}</Text>
                <Text style={[styles.text]}>${props.price}</Text>
            </View>

            <View 
                onTouchStart={() => { renderAnimation("start") }}
                onTouchEnd={() => { renderAnimation("end") }}
                style={[styles.cardContainer, global_styles.shadow]}
            >
                <Image
                    style={[styles.image, global_styles.shadow]}
                    source={mediaSource}
                />
            </View>
        </View>
    )
}

export default BoxCard

/*
    GIF used was taken from website: 
    https://dribbble.com/shots/2353058-Box-Opening-Sequence/attachments/2353058-Box-Opening-Sequence?mode=media
    credits reserved for author Parker Young
    ... 
    GIF was edited with https://ezgif.com/ web app.
 */
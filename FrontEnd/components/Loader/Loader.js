import React from 'react'
import AnimatedLoader from 'react-native-animated-loader';

import styles from './LoaderStyleSheet'

const Loader = (props) => {
    return (
        <AnimatedLoader
            speed={0.75}  
            visible={props.loading}
            animationStyle={styles.loader}
            source={require('../../loaders/cube-loader.json')}
            {...props}
        />
    )
}

export default Loader
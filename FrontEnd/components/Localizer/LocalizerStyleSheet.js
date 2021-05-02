import {StyleSheet, Dimensions} from 'react-native'

const styles = StyleSheet.create({
    loaderOverlay: {
        width: '100%',
        height: Dimensions.get('window').height,

        position: 'absolute',
        top: 0, bottom: 0, 
        left: 0, right: 0,
        zIndex: 3,

        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    iconContainer: {
        height: '100%',
        width: '100%',
    },

    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }
})

export default styles
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    loaderOverlay: {
        width: '100%',
        height: '100%',

        position: 'absolute',
        top: 0, bottom: 0, 
        left: 0, right: 0,
        zIndex: 3,

        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    imageContainer: {
        width: '70%',
        height: 200,

        alignSelf: 'center',
        backgroundColor: 'lightgray',

        margin: 50
    },

    productImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch'
    },

    radius: {
        borderRadius: 10
    },

    formContainer: {
        width: '85%',
    
        alignItems: 'center',
        alignSelf: 'center',
    },

    formText: {
        alignSelf: 'flex-start',
        marginTop: 15
    },

    buttonContainer: {
        width: '60%',
        height: 40,

        alignSelf: 'center',
        margin: 50,

        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    button: {
        width: '35%',
        height: '100%'
    }
})

export default styles
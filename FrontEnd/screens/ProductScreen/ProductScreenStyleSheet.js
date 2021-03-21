import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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

        // backgroundColor: 'black'
    },

    formText: {
        alignSelf: 'flex-start',
        marginTop: 15
    },

    buttonContainer: {
        marginTop: 20,
        marginBottom: 30,
    }
})

export default styles
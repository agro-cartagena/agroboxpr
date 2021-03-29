import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    arrowContainer: {
        padding: 10
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
        padding: 10,

        alignItems: 'center',
        alignSelf: 'center',

        // backgroundColor: 'black'
    },

    formText: {
        alignSelf: 'flex-start',
        marginTop: 10
    },

    buttonContainer: {
        width: '25%',
        height: 40,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 50,
    },

    header: {
        fontSize: 22,
        alignSelf: 'center',
        margin: 20
    },

    productCardContainer: {
        width: '45%',
        height: 120,

        marginTop: 10,
        marginBottom: 10
    },

    dropDownContainer: {
        width: '100%'
    },
})

export default styles
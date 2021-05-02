import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '65%',
        height: 225, 
        margin: 25,

        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textContainer: {
        height: '20%',
        marginTop: 5, 
        marginBottom: 5, 
        justifyContent: 'center'
    },

    text: {
        color: 'white',
        textAlign: 'center'
    },

    imageContainer: {
        width: '100%',
        height: '80%',
        backgroundColor: 'lightgray',

        borderWidth: 2,
        borderColor: 'gray', 
        borderRadius: 10
    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden'
    }
})

export default styles
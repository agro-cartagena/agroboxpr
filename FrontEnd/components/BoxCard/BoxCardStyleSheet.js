import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },

    textContainer: {
        width: '90%',
        margin: 8,

        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        zIndex: 2, 
        position: 'absolute', 
    },

    text: {
        fontWeight: "bold",
        fontSize: 20
    },

    cardContainer: {
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: 'white',
    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 12
    }
})

export default styles;
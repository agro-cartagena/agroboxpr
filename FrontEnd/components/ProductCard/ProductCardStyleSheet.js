import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    cardContainer: {
        width: '48%',
        marginTop: 10,
        marginBottom: 10
    }, 

    textContainer : {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 1,
    },

    text: {
        fontSize: 12,
        fontWeight: "bold"
    },

    productName: {
        color: "white",
        flex: 1,
        flexWrap: 'wrap'
    },

    productQuantity: {
        color: 'rgb(151, 184, 56)'
    },

    card: {
        height: 100,
        padding: 0, 
        margin: 0,

        borderWidth: 1,
        borderColor: 'black'
    },

    image: {
        height: '100%', 
        resizeMode: 'stretch'
    },

    radius: {
        borderRadius: 15
    }
})

export default styles;
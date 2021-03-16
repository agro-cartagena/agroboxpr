import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    cardContainer: {
        width: '48%',
        marginTop: 7,
        marginBottom: 7,
    }, 

    textContainer : {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 1,
    },

    productName: {
        color: "white",
        fontWeight: "bold"
    },

    productQuantity: {
        color: 'rgb(151, 184, 56)',
        fontWeight: "bold"
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
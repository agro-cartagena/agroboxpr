import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
    }, 

    textContainer : {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 1,
    },

    text: {
        fontSize: RFPercentage(1.5),
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
        height: '90%',
        padding: 0, 
        margin: 0,

        borderWidth: 1,
        borderColor: 'black'
    },

    image: {
        width: '100%',
        height: '100%', 
        resizeMode: 'stretch'
    },

    radius: {
        borderRadius: 15
    }
})

export default styles;
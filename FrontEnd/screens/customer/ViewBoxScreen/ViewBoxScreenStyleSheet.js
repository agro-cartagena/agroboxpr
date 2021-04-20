import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    card: {
        width: '65%',
        padding: 0,

        backgroundColor: 'rgb(151, 184, 56)',
        borderColor: 'black',

        alignSelf: 'center',
        borderRadius: 10
    },

    cardTitle: {
        fontSize: 22
    },

    cardText: {
        margin: 8
    },

    imageRadius: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    productContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },

    productCardContainer: {
        width: '45%',
        // height: 120,
        height: RFPercentage(16.5),

        marginTop: 20,
        marginBottom: 20
    },

    text: {
        margin: 25,
        alignSelf: 'center',
        textAlign: 'center',

        color: 'white',
        fontWeight: "bold",
        fontSize: 18
    },

    addToCartContainer: {
        width: '90%',
        height: 40,
        marginBottom: 50,

        flexDirection: 'row',
        justifyContent: 'space-evenly',

        alignSelf: 'center',
        alignItems: 'center',
    },

    plusMinusContainer: {
        width: '50%',
    },    
    
    buildContainer: {
        marginTop: 15,
        marginBottom: 15
    },

    dropDownContainer: {
        width: '100%'
    }
})

export default styles;
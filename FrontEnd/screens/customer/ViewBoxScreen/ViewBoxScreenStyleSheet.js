import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    header: {
        margin: 25,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    card: {
        width: '65%',
        height: 200,

        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(151, 184, 56)',

        borderWidth: 1,
        borderColor: 'black',

        overflow: 'hidden'
    },

    cardImage: {
        height: '80%',
    },

    cardTextContainer: {
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardText: {
        color: 'white',
        fontWeight: 'bold',

        fontSize: 16
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

    QuantitySpecifierContainer: {
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
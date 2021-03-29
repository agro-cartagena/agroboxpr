import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    arrowContainer: {
        marginTop: 10,
        marginBottom: 10,
    },

    card: {
        width: '70%',
        padding: 0,

        backgroundColor: 'rgb(151, 184, 56)',
        borderColor: 'black',

        alignSelf: 'center',
        justifyContent: 'center',
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
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',

        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },

    productCard: {
        width: '45%',
        height: 120,

        marginTop: 10, 
        marginBottom: 10, 
    },

    text: {
        margin: 25,
        alignSelf: 'center',

        color: 'white',
        fontWeight: "bold",
        fontSize: 18
    },

    addToCartContainer: {
        width: '90%',
        height: 40,
        margin: 50,

        flexDirection: 'row',
        justifyContent: 'space-evenly',

        alignSelf: 'center',
        alignItems: 'center',
    },

    plusMinusContainer: {
        width: '50%',
    }
})

export default styles;
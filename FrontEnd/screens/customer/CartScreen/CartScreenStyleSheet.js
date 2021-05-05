import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    cartContainer: {
        width: '95%',
        alignSelf: 'center',
        margin: 15,

        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,

        backgroundColor: 'white',
        overflow: 'hidden'
    },

    itemContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.15,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    hr: {
        borderBottomWidth: 0.25,
        borderColor: 'lightgray',
    },

    cardContainer: {
        width: '50%',
        height: '85%',
    }, 

    boxPriceContainer: {
        width: '30%',
        height: '65%',

        alignItems: 'center',
        justifyContent: 'space-evenly',

        // backgroundColor: 'gray'
    },

    quantitySpecifier:{
        width: '100%',
        height: '40%',
        
        // backgroundColor: 'black'
    },

    quantityText: {
        fontWeight: 'bold', 
        fontSize: 15,
        // margin: 10
    },

    iconContainer: {
        width: '12%',
        height: '50%',

        padding: 2.5,
        // backgroundColor: 'black'
    },

    icon:{
        width: '100%',
        height: '100%',

        resizeMode: 'contain',
        tintColor: 'gray',
    },

    text: {
        alignSelf: 'center',
        fontSize: 18,
        margin: 10
    },

    buttonContainer: {
        width: '25%',
        height: 40,
        alignSelf: 'center',
        margin: 10,
        marginBottom: 30
    },

    emptyCartTextContainer: {
        width: '100%', 
        height: Dimensions.get('window').height * 0.25,
        marginTop: 25,
        
        borderWidth: 1,
        borderColor: '#BA104970',
        justifyContent: 'center'
    },

    text: {
        textAlign: 'center',
        fontSize: 18,
        margin: 5
    },

    emptyCartText: {
        color: 'white', 
    },

    redirectionText: {
        color: 'rgb(151, 184, 56)',
        fontWeight: 'bold',
    },
})

export default styles
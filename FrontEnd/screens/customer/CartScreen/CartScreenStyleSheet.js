import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    cartContainer: {
        width: '90%',
        alignSelf: 'center',
        margin: 15,

        // borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 10,

        backgroundColor: 'white'
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    cardContainer: {
        width: '40%',
        height: 100,
        margin: 10,
    }, 

    QuantitySpecifier:{
        width: '35%',
        height: 35,
        // backgroundColor: 'white'
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
    }
})

export default styles
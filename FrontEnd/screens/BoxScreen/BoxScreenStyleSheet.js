import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    screen: {
        padding: 10
    },

    arrow: {
        width: 40,
        height: 30,

        marginTop: 15,
        marginBottom: 15,

        resizeMode: 'contain',
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

    text: {
        margin: 25,
        alignSelf: 'center',

        color: 'white',
        fontWeight: "bold",
        fontSize: 18
    },

    addToCartContainer: {
        width: '90%',
        height: 50,

        marginTop: 40,
        marginBottom: 50,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        alignItems: 'center',
        // backgroundColor: 'white'
    },

    inputContainer: {
        width: '50%',
        height: 45,

        flexDirection: 'row',
        backgroundColor: 'white',

        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1
    },

    icon: {
        width: '100%',
        height: '80%',

        resizeMode: 'contain',
        tintColor: 'rgb(151, 184, 56)'
    },

    iconContainer: {
        alignSelf: 'center',
        width: '33.33%'
    },

    inputField: {
        width: '33.33%',
        backgroundColor: 'lightgray',
        textAlign: 'center',
    },
    
    button: {
        width: '20%',
        height: '80%',
    }
})

export default styles;
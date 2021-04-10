import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    screen: {
        padding: 10,
    },

    arrow: {
        width: '10%',
        height: 30,

        marginTop: 15,
        marginBottom: 15,

        resizeMode: 'contain',
    },

    card: {
        padding: 0,
        margin: 0, 

        marginTop: 25,
        marginBottom: 25,

        // backgroundColor: 'rgb(151, 184, 56)'
        borderColor: 'black'
    },

    radius: {
        borderRadius: 10,
    },

    productContainer: {
        marginTop: 25,

        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',

        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    text: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: 'center'
    }
})

export default styles;
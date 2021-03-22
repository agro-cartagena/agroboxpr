import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    screen: {
        marginTop: '10%'
    },

    header: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: 'center'
    },

    productCardContainer: {
        width: '45%',
        height: 120,

        marginTop: 12,
        marginBottom: 12

        // backgroundColor: 'black'
    },

    menuContainer: {
        marginTop: '10%',
        marginBottom: '10%'
    },

    dropDownContainer: {
        width: '100%'
    },

    buttonContainer: {
        width: '75%',

        padding: '2.5%',
        marginBottom: '25%',
        alignSelf: 'center'
    }
})

export default styles
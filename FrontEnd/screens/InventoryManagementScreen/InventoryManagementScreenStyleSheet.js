import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        justifyContent: 'center'
    },

    header: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: 'center'
    },

    buttonContainer: {
        width: '100%',
        height: '30%',

        justifyContent: 'space-evenly',
    },

    button: {
        width: '80%',
        height: 50,

        alignSelf: 'center',
    }
})

export default styles
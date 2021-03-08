import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#8C0634'
    },

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    screen: {
        width: '100%',
        height: '100%'
    },

    textEntry: {
        width: '80%',
        height: 45,

        textAlign: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'lightgray',

        // backgroundColor: '#E5E5E5',
        backgroundColor: 'white',
    },

    text: {
        color: 'white',
        fontSize: 16
    },

    shadow: {
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 8,
        shadowRadius: 3
    },

    button: {
        padding: '2.5%',
        marginBottom: '2.5%',

        backgroundColor: '#5EAE33',
        borderRadius: 10,
    }
})

export default styles;
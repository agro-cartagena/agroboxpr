import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },

    logo: {
        maxWidth: '80%',
        maxHeight: '70%',

        flex: 1,
        resizeMode: 'contain',
        backgroundColor: 'red'
    },

    form: {
        backgroundColor: 'red',
        width: '100%'
    },

    textEntry: {
        width: '85%',
        margin: 8,

        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',

        backgroundColor: 'lightgray'
    },

    button: {
        width: '100%',
        height: '100%',
        padding: 10
    }
})

export default styles;
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },

    logoContainer: {
        width: '60%',
        height: '25%',
        // borderWidth: 2
    },

    logo: {
        width: '100%',
        height: '100%',

        resizeMode: 'contain',
        // backgroundColor: 'blue'
    },

    form: {
        // backgroundColor: 'red',
        width: '100%',
        height: '17%',

        margin: '8%',
        justifyContent: 'space-between'
    },

    textEntry: {
        width: '75%',
        height: 40,

        textAlign: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'lightgray',

        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 8,
        shadowRadius: 3,
        backgroundColor: '#E5E5E5'
    },

    buttonContainer: {
        // backgroundColor: 'yellow'
    },

    button: {
        padding: '2.5%',
        marginBottom: '2.5%',

        backgroundColor: '#5EAE33',
        borderRadius: 15,

        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 8,
        shadowRadius: 2,
    },

    buttonText: {
        color: 'white'
    }
})

export default styles;
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
        height: '20%',
        justifyContent: 'space-evenly'
    },

    textEntry: {
        width: '75%',
        height: 35,

        textAlign: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',

        // shadowColor: 'gray',
        // shadowOffset: {width: 0, height: 2},
        // shadowOpacity: 10,
        // shadowRadius: 3,
        backgroundColor: 'lightgray'
    },

    buttonContainer: {
        // backgroundColor: 'yellow'
    },

    button: {
        width: '100%',
        height: '100%',
        padding: 10
    }
})

export default styles;
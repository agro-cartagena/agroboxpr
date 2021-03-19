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

    logoContainer: {
        width: 175,
        height: 175,

        alignSelf: 'center',
        justifyContent: 'center',

        margin: 20,
        backgroundColor: 'white',

        borderRadius: 100
    },
    
    logo: {
        width: '90%',
        height: '90%',

        alignSelf: 'center',
        resizeMode: 'contain',
    },

    text: {
        color: 'white',
        fontSize: 16
    },

    shadow: {
        shadowColor: '#8a795d',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 8,
        shadowRadius: 3
    },

    button: {
        backgroundColor: 'rgb(151, 184, 56)',
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;
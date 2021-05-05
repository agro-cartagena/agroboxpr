import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({    
    screen: {
        width: '100%',
        height: '90%',

        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        // backgroundColor: 'red',
        width: '85%',
        alignItems: 'center',
        margin: 10,
    },

    buttonContainer: {
        height: 40,
        marginTop: 25,
        margin: 15
    },

    clickText: {
        color: 'rgb(151, 184, 56)',
        fontWeight: "bold"
    },

    forgotPasswordContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    forgotPasswordText: {
        margin: 25,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },

    forgotPasswordFormInput: {
        width: '90%',
        height: 50
    },

    forgotPasswordButton: {
        width: '50%',
        height: 50,
        margin: 25
    }
})

export default styles;
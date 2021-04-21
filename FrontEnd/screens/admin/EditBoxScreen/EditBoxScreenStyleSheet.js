import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    formContainer: {
        width: '85%',
        padding: 10,

        alignItems: 'center',
        alignSelf: 'center',

    },

    formText: {
        alignSelf: 'flex-start',
        marginTop: 10
    },

    buttonContainer: {
        width: '60%',
        height: 40, 

        margin: 50,
        alignSelf: 'center',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '35%',
        height: '100%'
    },

    iconContainer: {
        width: '20%',
        height: '100%',

        padding: 2.5 
    },

    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    
    header: {
        fontSize: 22,
        alignSelf: 'center',
        margin: 20
    },

    productCardContainer: {
        width: '45%',
        height: 120,

        marginTop: 10,
        marginBottom: 10
    },

    dropDownContainer: {
        width: '100%'
    },
})

export default styles
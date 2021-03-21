import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: '100%',

        flexDirection: 'row',
        backgroundColor: 'white',

        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1
    },

    icon: {
        width: '100%',
        height: '80%',

        resizeMode: 'contain',
        tintColor: 'rgb(151, 184, 56)'
    },

    iconContainer: {
        alignSelf: 'center',
        width: '33.33%'
    },

    inputField: {
        width: '33.33%',
        backgroundColor: 'lightgray',
        textAlign: 'center',
    },
})

export default styles
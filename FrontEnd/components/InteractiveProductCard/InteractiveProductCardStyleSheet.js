import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    inputContainer: {
        height: '25%',
        width: '80%',
        alignSelf: 'center',
        
        zIndex: 2,
        position: 'absolute',
        bottom: '5%'
    },

    activeBorder: {
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 10
    },

    inactiveBorder: {

    }
})

export default styles
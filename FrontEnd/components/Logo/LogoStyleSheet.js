import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
    }
})

export default styles
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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

        margin: '8%',
        justifyContent: 'space-between'
    },

    clickText: {
        color: '#5EAE33',
        fontWeight: "bold"
    }
})

export default styles;
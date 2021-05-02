import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    loaderOverlay: {
        width: '100%',
        height: '100%',

        position: 'absolute',
        top: 0, bottom: 0, 
        left: 0, right: 0,
        zIndex: 3,

        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    
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
    }
})

export default styles;
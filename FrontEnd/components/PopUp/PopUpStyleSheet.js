import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },

    overlay: { 
        width: '100%',
        height: '100%',

        backgroundColor: '#000000aa',
        position: 'absolute',
        zIndex: 2,
    },

    popupContainer: {
        width: '85%',
        height: '65%',

        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        zIndex: 3,

    },

    popup: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',

        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    }
})

export default styles
import { StyleSheet, Dimensions } from 'react-native'

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
    
    header: {
        color: 'white',
        fontSize: 22,
        fontWeight: "bold",
        textAlign: 'center',
        margin: 20
    },

    dropDownContainer: {
        marginTop: 25
    },

    cardContainer: {
        width: '100%',
        alignItems: 'center',
    },

    card: {
        width: '90%'
    },

    iconHeading: {
        width: '95%'
    },

    iconContainer: {
        width: '10%',
        height: 40,

        margin: 10,
        marginTop: 20,
        alignSelf: 'flex-start',
    },

    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default styles
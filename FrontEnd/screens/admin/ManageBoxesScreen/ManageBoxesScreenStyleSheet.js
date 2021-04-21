import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: 'center',
        margin: 20
    },

    cardContainer: {
        height: 200,
        width: '100%',

        padding: 10,
        alignSelf: 'center',
    },

    overlay: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.60,

        width: '100%',
        height: '100%',

        alignSelf: 'center',
        margin: 10,

        borderRadius: 15
    },

    buttonContainer: {
        width: '75%',
        height: 50,
        
        alignSelf: 'center',

        margin: 30,
        marginBottom: 50
    }
})

export default styles
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },

    textContainer: {
        height: '15%',
        width: '65%',
        margin: 5,

        alignSelf: 'center',
        alignItems: 'center',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    text: {
        fontWeight: "bold",
        fontSize: 18
    },

    cardContainer: {
        height: '85%',

        borderWidth: 2,
        borderRadius: 15,
        // borderColor: '#8C0634',

        backgroundColor: 'white'
    },

    image: {
        height: '100%',
        width: '100%',
        borderRadius: 10
    }
})

export default styles;
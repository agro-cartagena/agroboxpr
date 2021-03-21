import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        padding: 0,
        margin: 0,

        width: '100%',
        height: '100%',
        alignSelf: 'center',

        borderWidth: 1,
        borderColor: 'black'
    },

    image: {
        height: '100%',
        resizeMode: "stretch",
    },

    radius: {
        borderRadius: 15
    }
})

export default styles;
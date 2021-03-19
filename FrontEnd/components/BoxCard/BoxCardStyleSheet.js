import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'black',

        padding: 0,
        margin: 0,
        
        marginTop: 12,
        marginBottom: 12,

        width: '90%',
        alignSelf: 'center'
    },

    image: {
        resizeMode: "stretch",
    },

    radius: {
        borderRadius: 15
    }
})

export default styles;
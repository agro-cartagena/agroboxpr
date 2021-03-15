import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        width: '45%',
        // height: '20%',
        padding: 0, 

        borderWidth: 1,
        borderRadius: 15
    },

    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        resizeMode: 'contain'
    }
})

export default styles;
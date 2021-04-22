import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    trashCanContainer: {
        margin: 10
    },

    // arrow has been given fixed width and height for consistency
    trashCan: {
        // color: 'black',
        backgroundColor: 'black',
        width: 40,
        height: 30,
        resizeMode: 'contain',
    }
})

export default styles
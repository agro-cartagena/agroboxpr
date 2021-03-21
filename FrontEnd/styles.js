import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#8C0634'
    },

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    screen: {
        padding: 10
    },

    text: {
        color: 'white',
        fontSize: 16
    },

    shadow: {
        shadowColor: '#8a795d',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 8,
        shadowRadius: 3
    },

    formEntry: {
        width: '100%',
        height: 45,
        margin: 8
    }
})

export default styles;
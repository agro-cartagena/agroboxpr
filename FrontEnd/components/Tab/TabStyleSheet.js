import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    tab: {
        width: '20%',
        height: '100%',

        padding: '2%'
    },

    defaultBorder: {
        borderTopWidth: 1,
        borderColor: '#BA104970'
    },

    activeBorder: {
        borderTopWidth: 2,
        borderColor: 'white'
    },

    icon: {
        width: '50%',
        height: '50%',

        resizeMode: 'contain'
    }
})

export default styles;
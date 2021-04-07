import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    dropMenu: {
        width: '100%',
        // backgroundColor: 'black'
        // borderColor: '#BA104970',
        // borderWidth: 2
    },

    menu: {
        padding: 15,
        // backgroundColor: 'white',

        borderWidth: 2,
        borderColor: '#BA104970',
        // borderColor: 'white',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    title: {
        color: 'white',
        fontSize: 18,
        // fontWeight: "bold"
    },

    arrowContainer: {
        height: 20,
        width: 25
    },

    arrow: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
    },

    listContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        
        flexDirection: "row",
        flexWrap: 'wrap',

        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        overflow: 'scroll'
    },

    visible: {
        display: 'flex'
    },

    hidden: {
        display: 'none'
    }
})

export default styles
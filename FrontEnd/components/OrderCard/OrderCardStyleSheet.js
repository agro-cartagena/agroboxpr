import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    
    cardContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.15, 

        margin: 10,
        padding: 10,
        flexDirection: 'row',

        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: 'white',

        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black'
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    info: {
        width: '50%',
        height: '100%',
        justifyContent: 'space-between'
    },

    orderInfo: {
        alignItems: 'flex-end'
    },

    quartet: {
        width: '100%',
        height: '50%',
        // borderWidth: 1,
        // borderColor: 'black', 
    },

    text: {
        fontWeight: 'bold',
        fontSize: RFPercentage(2)
    },

    listContainer: {
        width: '100%',
        // height: '100%', 

        borderWidth: 1,
        borderColor: 'black',
    },

    textContainer: {
        width: '100%',
        height: '25%',
        
        alignItems: 'center',
        justifyContent: 'space-evenly',

        borderWidth: 1,
        borderColor: 'black',
        borderBottomRightRadius: 9,
        borderBottomLeftRadius: 9,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        borderWidth: 1, 
        borderColor: 'black',
        
        backgroundColor: 'lightgray',
        textAlign: 'center'
    },

    headerText: {
        padding: 5,
        fontSize: RFPercentage(2.2),
        fontWeight: 'bold'
    },

    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        borderWidth: 1, 
        borderColor: 'black',

        alignItems: 'center',
    },

    itemText: {
        padding: 10,
        fontSize: RFPercentage(1.8)
    }
})

export default styles
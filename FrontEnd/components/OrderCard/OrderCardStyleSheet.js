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
        justifyContent: 'space-between'
    },

    orderInfo: {
        alignItems: 'flex-end'
    },

    text: {
        fontWeight: 'bold',
        fontSize: RFPercentage(2)
    }
})

export default styles
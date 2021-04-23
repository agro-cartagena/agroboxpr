import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    header: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold', 
        textAlign: 'center', 
        margin: 40
    },

    text: {
        color: 'white',
        textAlign: 'center', 
        fontSize: RFPercentage(2),
        margin: 25
    },

    card: {
        width: '90%'
    },

    unauthenticatedTextContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.25,

        alignItems: 'center',
        justifyContent: 'center',

        borderWidth: 1, 
        borderColor: '#BA104970'
    }, 

    unauthenticatedText: {
        color: 'white',
        textAlign: 'center', 
        fontSize: 18,
    },

    redirectionText: {
        color: 'rgb(151, 184, 56)',
        fontWeight: 'bold',
        fontSize: 18,

        textAlign: 'center', 
        margin: 10
    }
})

export default styles
import { StyleSheet, Dimensions } from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        margin: 25,

        color: "white",
        textAlign: "center",
        fontWeight: 'bold'
    }, 

    buttonContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.30,
        flex: 1,

        alignItems: 'center',
        // backgroundColor: 'white',
    },

    button: {
        width: '75%',
        height: '25%',
        margin: 10,

        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: RFPercentage(1.5),

        backgroundColor: 'white'
    },

    buttonTextContainer:{
        width: '75%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: RFPercentage(2.5)
    },

    iconContainer: {
        width: '25%',
        height: '100%',
        padding: 10,

        alignItems: 'center'
    },

    icon: {
        width: '100%',
        height: '100%',

        resizeMode: 'contain'
    },

    cash: {
        width: '80%',        
        padding: 5,

        backgroundColor: 'rgb(151, 184, 56)',
        borderRadius: 100,
    }

})

export default styles
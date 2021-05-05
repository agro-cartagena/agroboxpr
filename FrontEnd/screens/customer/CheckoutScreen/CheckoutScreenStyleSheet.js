import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    loaderOverlay: {
        width: '100%',
        height: '100%',

        position: 'absolute',
        top: 0, bottom: 0, 
        left: 0, right: 0,
        zIndex: 3,

        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    
    header: {
        fontSize: 22,
        margin: 25,

        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    hrContainer: {
        width: '100%',
        margin: 25
    },

    hr: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#BA104970',
    },

    buttonContainer: {
        width: '50%',
        height: 45,
        margin: 30,

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
    },

    localizerContainer:{
        width: '30%'
    },

    formContainer:{
        width: "100%",
    },
    formInputContainer:{
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: 'red',
        width: '78%',
        height: 45,
        margin: 20
    },
    text:{
        // justifyContent: 'space-evenly',
        textAlign: 'left',
        marginBottom: '5%',
        // fontWeight: 'bold',
        // backgroundColor: 'green',
        // alignSelf: 'center',
        color: 'white',
        width: '100%',
        fontSize: 16
    },
    button:{
        width: '50%',
        height: '100%',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30
    }

})

export default styles
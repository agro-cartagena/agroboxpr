import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    formContainer:{
        width: '100%',
        // marginTop: 25
        // height: '60%',
        // justifyContent: 'space-evenly', 
    },
    fContainer:{
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: 'red',
        width: '78%',
        height: 45,
        margin: 20
    },
    logo: {
        margin: 25
    },
    header: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold', 
        textAlign: 'center', 
        margin: 40
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
        fontSize: 14
    },
    textinput:{
        // fontSize: 15,
        // color: 'white'
        textAlign: 'left'
    },
    buttonContainer:{
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly', //?
        height: 40,
        margin: 15
    },
    cancelButton:{
        backgroundColor: '#B6B6B6',
    },
    saveButton:{
        backgroundColor: '#EAC71D',
    }
})

export default styles;
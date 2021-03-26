import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    logoContainer:{
        width: '30%',
        height: '17%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: 'center',
        marginBottom: '10%'
    },
    logo:{
        width:'90%',
        height: '90%',
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    formContainer:{
        width: '100%',
        height: '60%',
        justifyContent: 'space-evenly', 
    },
    fContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        // backgroundColor: 'red'
    },
    form: {
        flexDirection: 'row',
        width: '78%',
        height: 60,
        borderBottomWidth: 2,
        borderBottomColor: '#EAC71D',
        // backgroundColor: 'yellow'
    },
    text:{
        // justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        // backgroundColor: 'green',
        // alignSelf: 'center',
        color: 'white',
        width: '18%',
        fontSize: 15
    },
    textinput:{
        fontSize: 15,
        color: 'white'
    },
    buttonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})

export default styles;
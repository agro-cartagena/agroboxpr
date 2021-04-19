import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    arrowContainer:{
        margin:10
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
        margin: 15
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
    button:{
        width: '25%',
        height: 40,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30
    }

})

export default styles
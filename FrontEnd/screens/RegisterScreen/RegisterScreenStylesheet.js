import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    logoContainer:{
        width: '55%',
        height: '20%',
        alignSelf: 'center',
        // backgroundColor: 'green'
    },
    logo: {
        width :'100%',
        height: '100%',
       
        resizeMode: 'contain',
        // backgroundColor: 'red'
    },
    form:{
        // backgroundColor:'red',
        width: '100%',
        height: '40%',
        justifyContent: 'space-evenly',  
        marginTop: '10%'

    },
    textinput: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '75%', 
        height: 40,

        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#E5E5E5',
        borderRadius: 100,
        shadowColor: 'grey',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 8,
        shadowRadius: 3,
    },
    buttonContainer:{
        // backgroundColor: 'blue'  ,
        marginTop: '5%',
    },
    button: {
        justifyContent:'center',

        shadowColor: 'grey',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 8,
        shadowRadius: 3,
        backgroundColor: '#5EAE33',
        borderRadius: 12
    },
    // Used for TouchableOpacity
    btntext: {
        fontSize: 17,
        alignSelf:'center',
        color: 'white',
        padding: "2.5%"
    }

})

export default styles;
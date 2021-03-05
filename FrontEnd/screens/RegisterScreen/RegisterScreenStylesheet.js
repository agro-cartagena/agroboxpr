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
        borderColor: 'black',
        backgroundColor: '#E5E5E5',
        borderRadius: 100
    },
    butttonContainer:{
        backgroundColor: 'blue'   
    },
    button: {
        width:'100%',
        height: '100%',
        // marginTop: 10,
        // fontSize: 20,
        // justifyContent:'center',

        // backgroundColor: '#5EAE33',
        // borderRadius: 10
    },
    // Used for TouchableOpacity
    btntext: {
        fontSize: 22,
        alignSelf:'center',
        color: 'white'
    }

})

export default styles;
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
        height: '42%',
        justifyContent: 'space-evenly',  
        marginTop: '10%'

    },
    btntext: {
        fontSize: 17,
        color: 'white',
    },
    textDecoration: {
        marginTop: '5%',
        color: 'white'

    },
    textClick:{
        color: '#5EAE33'
        
    }

})

export default styles;
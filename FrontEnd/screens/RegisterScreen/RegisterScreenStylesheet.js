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
        height: '45%',
        justifyContent: 'space-evenly',  
        margin: '2%'
    },

    textClick:{
        color: '#5EAE33'
        
    }
})

export default styles;
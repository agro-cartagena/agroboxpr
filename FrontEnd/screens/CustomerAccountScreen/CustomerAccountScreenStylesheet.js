import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    logoContainer:{
        width: '35%',
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
        // flexDirection : 'row',
        backgroundColor:'red',
        width: '100%',
        height: '60%',
        justifyContent: 'space-evenly',  
        
        // margin: '2%'
    },
    form: {
        width: '80%',
        height: 60,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        backgroundColor: 'yellow'
    },

    clickText: {
        color: 'rgb(151, 184, 56)',
        fontWeight: "bold"
    }
})

export default styles;
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        // width: '100%',
        // height: '100%',
        backgroundColor: 'white'
    },
    logo: {
        maxWidth :'45%',
        maxHeight: '35%',
        marginTop: 80,

        // flex: 1,
        resizeMode: 'contain',
        // backgroundColor: 'red'
    },
    form:{
        // backgroundColor:'red',
        // width: '100%'
        
    },
    textinput: {
        alignSelf: 'center',
        paddingLeft: 20,
        width: '75%', 
        height: 40,
        marginBottom: '5%',

        backgroundColor: '#E5E5E5',
        borderRadius: 22
    },
    button: {
        width:'40%',
        height: 50,
        marginTop: 10,
        fontSize: 20,
        justifyContent:'center',

        backgroundColor: '#5EAE33',
        borderRadius: 10
    },
    // Used for TouchableOpacity
    btntext: {
        fontSize: 22,
        alignSelf:'center',
        color: 'white'
    }

})

export default styles;
import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:30,
        alignItems: 'center',
    },

    headerContainer: {
        width: '80%',
        flex: 1
    },

    text:{
        color: 'white',
        textAlign: 'center',

        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonContainer:{
        width: '75%',
        height: 250, 
        margin: 25,

        justifyContent:'center',
    },

    iconContainer:{
        width: '100%',
        height: '25%',

        marginTop: 10,
        marginBottom: 10,
    },

    icon:{
        margin: 0, 
        padding: 0,

        width: '100%',
        height: '100%',
    }
})

export default styles
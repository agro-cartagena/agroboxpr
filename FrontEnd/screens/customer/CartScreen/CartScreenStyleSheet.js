import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    cartContainer: {
        width: '90%',
        alignSelf: 'center',
        margin: 15,

        // borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 10,

        backgroundColor: 'white'
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // borderBottomWidth: 2,
        // borderBottomColor: 'yellow'
        // marginBottom:10
    },

    cardContainer: {
        width: '40%',
        height: 100,
        margin: 10
    }, 

    boxCard:{
        fontSize:10,
    },

    secondContainer:{
        flexDirection:'column',
        width: "54%",
    },

    thirdContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-start',
    },

    plusminus:{
        width: '55%',
        height: 35,
        backgroundColor: 'white'
    },

    text: {
        alignSelf: 'center',
        fontSize: 18,
        margin: 10
    },

    total_text:{
        fontWeight: 'bold', 
        fontSize: 15, 
        backgroundColor: 'white'
    },

    buttonContainer: {
        width: '25%',
        height: 40,
        alignSelf: 'center',
        margin: 10,
        marginBottom: 30
    }
})

export default styles
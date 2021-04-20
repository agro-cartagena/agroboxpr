
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    arrowContainer:{
        margin:10
    },
    text:{
        fontSize: 15,
        color: "white",
        textAlign: "center"
    },
    cartContainer: {
        width: '90%',
        alignSelf: 'center',
        margin: 15,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    itemContainer: {
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
    },
    cardContainer: {
        width: '55%',
        height: 100,
        margin: 10
    }, 
    total_text:{
        fontSize:18,
        textAlign: "right",
        marginEnd: 55,

        // borderTopWidth: 2,
        // borderTopColor: "white",
        // borderRadius: 15,
    },

    buttonContainer:{
        flexDirection: "row",
        width: '25%',
        height: 40,
        alignSelf: 'center',
        marginTop:30
    },
    button:{
        margin: 10, 
    }


})

export default styles
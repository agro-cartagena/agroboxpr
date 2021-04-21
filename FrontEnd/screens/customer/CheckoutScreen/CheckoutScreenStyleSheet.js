import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    arrowContainer:{
        marginLeft:10
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
    form_text:{
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
    },
    text:{
        fontSize: 20,
        color: "white",
        textAlign: "center",
        fontWeight: 'bold',
        marginBottom: 13,
        color: '#EAC71D'
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
        marginBottom: 20

        // borderTopWidth: 2,
        // borderTopColor: "white",
        // borderRadius: 15,
    },

    // buttonContainer:{
    //     flexDirection: "row",
    //     width: '25%',
    //     height: 40,
    //     alignSelf: 'center',
    //     marginTop:30
    // },
    // button:{
    //     margin: 10, 
    // }

})

export default styles
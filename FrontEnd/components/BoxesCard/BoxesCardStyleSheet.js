import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer:{
        // padding: '10%',
        // backgroundColor: 'green',
        marginBottom: 10,
        // marginLeft: '2%',
        width: '250%',
        // height: 60,
        shadowColor: 'grey',
        shadowOpacity: 1,
        shadowOffset:{
            width: 3, height: 3
        },
        borderWidth: 1,
        borderRadius: 10

        // width: '250%',
        // height: '62%',
        // borderColor: 'black',
        // borderRadius: 10
    },
    cardImage:{
        // backgroundColor: 'red',
        width: '100%',
        height: 200,
        resizeMode: 'cover'        
        // paddingLeft: '10%',
        // width: '20%',
        // height: '40%',
        // alignSelf: 'center',
    },
    cardtext:{
        fontSize: 30,
        alignSelf: 'center'
        // marginBottom: 10,
        // paddingLeft:70,
        // paddingRight:70
    }

})

export default styles;
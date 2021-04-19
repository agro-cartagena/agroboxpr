import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    arrowContainer: {
        margin: 10
    },

    header: {
        fontSize: 20,
    },

    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold', 
        margin: 25
    },

    priceText: {
        fontSize: 18
    },

    card:{
        // width: "40%",
        // padding: 0,
        // height: 60
        height: 110,
        width: '43%',
        marginTop: 15,
        marginBottom: 15
    },
    cardContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },

    buttonContainer: {
        width: '50%',
        height: 50,
        marginBottom: 30,
        alignSelf: 'center'
    }
})

export default styles
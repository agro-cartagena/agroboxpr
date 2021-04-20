import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({

    arrowContainer: {
        margin: 10
    },

    header: {
        fontSize: 22,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        margin: 20
    },

    subheader: {
        marginTop: 20,
        marginBottom: 8,
        // width: '75%',
        alignSelf: 'center',

        fontSize: 16,
        color: 'white',
    },

    sectionContainer: {
        width: '90%',
        height: Dimensions.get('window').height * 0.5,

        alignSelf: 'center',
        backgroundColor: 'lightgray',

        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden'
    },

    sectionHeader: {
        paddingTop: 4,
        paddingBottom: 4,

        paddingLeft: 10,
        paddingRight: 10,

        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'white',
      },

      item: {
        padding: 10,
        fontSize: 17,
      },

      searchContainer: {
        width: '75%',
        height: Dimensions.get('window').height * 0.05,
        flexDirection: 'row',

        alignSelf: 'center',
        backgroundColor: 'white',

        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        overflow: 'hidden'
      },

      inputField: {
          width: '85%',
          fontSize: 16,
          textAlign: 'center'
      },

      iconContainer: {
          width: '15%',
          height: '100%',

          padding: 10,
          backgroundColor: 'lightgray',
      }, 

      icon: {
          width: '100%',
          height: '100%',

          resizeMode: 'contain',
          tintColor: '#8C0634'
      }
})

export default styles
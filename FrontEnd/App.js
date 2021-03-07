// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   Button,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import LoginScreen from './screens/LoginScreen/LoginScreen'

// class App extends React.Component {
//   render() {
//     return (
//       <>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView>
//           <ScrollView
//             contentInsetAdjustmentBehavior="automatic"
//             style={styles.scrollView}>
//             <Header />
//             {global.HermesInternal == null ? null : (
//               <View style={styles.engine}>
//                 <Text style={styles.footer}>Engine: Hermes</Text>
//               </View>
//             )}
//             <View style={styles.body}>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>Step One</Text>
//                 <Button title="Click Me"/>
//                 <LoginScreen/>
//                 <Text style={styles.sectionDescription}>
//                   Edit <Text style={styles.highlight}>App.js</Text> to change this
//                   screen and then come back to see your edits.
//                 </Text>
//               </View>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>See Your Changes</Text>
//                 <Text style={styles.sectionDescription}>
//                   <ReloadInstructions />
//                 </Text>
//               </View>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>Debug</Text>
//                 <Text style={styles.sectionDescription}>
//                   <DebugInstructions />
//                 </Text>
//               </View>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>Learn More</Text>
//                 <Text style={styles.sectionDescription}>
//                   Read the docs to discover what to do next:
//                 </Text>
//               </View>
//               <LearnMoreLinks />
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </>
//     );
//   };
//   }


// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;


import React from 'react'
import { ScrollView, StyleSheet } from 'react-native';

import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import PremadeBoxesScreen from './screens/PremadeBoxesScreen/PremadeBoxesScreen'

class App extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.screen}>
        {/* <LoginScreen/> */}
        <RegisterScreen/>
        {/* <PremadeBoxesScreen/> */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  }
})

export default App;
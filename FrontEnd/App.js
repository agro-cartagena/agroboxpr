import React from 'react'
import { SafeAreaView } from 'react-native';

import CustomerAccountScreen from './screens/CustomerAccountScreen/CustomerAccountScreen'
import CartScreen from './screens/CartScreen/CartScreen'

import TabBar from './components/TabBar/TabBar'
import styles from './styles';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.app}>        
        <Routes/>
        {/* <CartScreen/> */}
        {/* <CustomerAccountScreen/> */}
        <TabBar/>
      </SafeAreaView>
    )
  }
}

export default App;
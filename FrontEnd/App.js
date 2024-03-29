import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import TabBar from './components/TabBar/TabBar'
import styles from './styles';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.app}>        
        <Routes/>
        <TabBar/>
      </SafeAreaView>
    )
  }
}

export default App;
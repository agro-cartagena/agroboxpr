import React from 'react'
import { View } from 'react-native';

import TabBar from './components/TabBar/TabBar'
import styles from './styles';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <View style={styles.app}>        
        <Routes/>
        <TabBar/>
      </View>
    )
  }
}

export default App;
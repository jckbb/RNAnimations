import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';

class App extends React.Component<InitialProps> {
  constructor(props: InitialProps) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(children) {
    return(
      <View style={styles.listRow}>
        {children}
      </View>
    );
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.list}>
          {this.renderRow(<View />)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;
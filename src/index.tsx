import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import { InitialProps } from 'expo/build/launch/withExpoRoot.types';
import ButtonOne from './components/ButtonOne';

interface State {
  maxListWidth: number,
};

class App extends React.Component<InitialProps, State> {
  constructor(props: InitialProps) {
    super(props);

    this.renderRow = this.renderRow.bind(this);

    this.state = {
      maxListWidth: 0,
    };
  }

  renderRow(children) {
    return(
      <View style={styles.listRow}>
        {children}
      </View>
    );
  }

  render() {
    const { maxListWidth } = this.state;

    return(
      <SafeAreaView style={styles.container}>
        <ScrollView onLayout={e => { this.setState({ maxListWidth: e.nativeEvent.layout.width }); }} style={styles.list}>
          {this.renderRow(<ButtonOne maxWidth={maxListWidth} >{'Cream'}</ButtonOne>)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;
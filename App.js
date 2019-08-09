import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import ApiClient from './ApiClient'
import DriverRow from './DriverRow'

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = { drivers: [] };
    this.apiClient = new ApiClient();
    // this.loading = false;
  }

  UNSAFE_componentWillMount() {
    this.loadContent()
  }

  loadContent = async () => {
    // if (this.loading){ return;}

    // this.loading = true;
    console.debug("Antes");
    const drivers = await this.apiClient.getDriverStandings(2018)
    this.setState({ drivers });
  }

  render() {

    console.log('STATE DRIVERS',this.state.drivers);
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.drivers}
          renderItem={({item}) => {
            console.log('ITEM', item);
            return (
            <DriverRow 
              title={item.Driver.familyName}
            />
          )}}
          >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  }
});

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Text,
  Modal,
  Image,
  Alert,
  ListHeaderComponent,
  View,
  TouchableHighlight
} from 'react-native';

import { DialogComponent, SlideAnimation } from "react-native-dialog-component";
import DriverRow from './DriverRow'
import ApiClient from './ApiClient'

export default class DriverList extends Component{

    static navigationOptions = {
        title: 'F1 Standings App',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: "#a37d00"
          },
          headerRight: (
            <TouchableHighlight>
                <Image
                    style={{width: 24, height: 24, marginEnd: 10}}
                    source={require('./assets/calendar.png')}
                />
            </TouchableHighlight>
          )
    };
    
    constructor(props) {
        super(props);
        this.apiClient = new ApiClient();
        this.state = { drivers: [] };
    }

    componentWillMount() {
        this.loadContent()
    }

    loadContent = async () => {
        const drivers = await this.apiClient.getDriverStandings(2018)
        this.setState({ drivers : drivers });
    }

    render() {
    return (
      <View style={styles.container}>
        
        <FlatList
          data={this.state.drivers}
          renderItem={({ item }) => {
            return (
              <DriverRow
                title={item.Driver.familyName}
                points={item.points}
                onPress={this.onDriverPressed.bind(this, item.Driver)}
              />
            );
          }}
          keyExtractor={item => item.Driver.familyName}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "92%",
              backgroundColor: "#CED0CE",
              marginLeft: "4%",
              marginRight: "4%",
            }}
          />
        );
      };
    
    onDriverPressed(driver){
        this.props.navigation.navigate('driverDetails', { driver: driver });
    }
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    },
});
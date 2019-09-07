import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Text,
  Image,
  View,TouchableHighlight
} from 'react-native';

import DriverRow from './DriverRow'
import ApiClient from './ApiClient'

export default class DriverList extends Component{

    static navigationOptions = {
        title: 'F1 Standings',
        headerRight: (
            <TouchableHighlight onPress={this._onFilterPress}>
                <Image
                source={require('./assets/calendar.png')}
                />
          </TouchableHighlight>
        )

    };

    constructor(props) {
        super(props);
    
        this.state = { drivers: [] };
        this.apiClient = new ApiClient();
    }
    
    componentWillMount() {
    this.loadContent()
    }
    
    loadContent = async () => {
        console.debug("Antes");
        const drivers = await this.apiClient.getDriverStandings(2018)
        this.setState({ drivers });
    }
    
    render() {
    return (
        <View style={styles.container}>
            <FlatList 
                data={this.state.drivers}
                renderItem={({item}) => {
                return (
                    <DriverRow 
                    title={item.Driver.familyName}
                    onPress={this.onDriverPressed.bind(this, item.Driver)}
                    />
                )
                }}>
            </FlatList>
        </View>
    );
    }
    
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
    }
});
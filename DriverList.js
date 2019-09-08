import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  Picker,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import DriverRow from './DriverRow'
import ApiClient from './ApiClient'

export default class DriverList extends Component {
                 constructor(props) {
                   super(props);

                   this.apiClient = new ApiClient();
                   this.state = {
                     drivers: [],
                   };
                 }

                 static navigationOptions = ({ navigation }) => {
                   params = navigation.state.params;
                   return {
                     title: "F1 Standings App",
                     headerTintColor: "white",
                     headerStyle: { backgroundColor: "#a37d00" },
                   };
                 };

                 componentWillMount() {
                   this.loadContent();
                 }

                 loadContent = async () => {
                   const drivers = await this.apiClient.getDriverStandings(2019);
                   this.setState({ drivers: drivers });
                 };

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
                               onPress={this.onDriverPressed.bind(
                                 this,
                                 item.Driver
                               )}
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
                         marginRight: "4%"
                       }}
                     />
                   );
                 };

                 onDriverPressed(driver) {
                   this.props.navigation.navigate("driverDetails", {
                     driver: driver
                   });
                 }
               }
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    picker: {
        height: 50, 
        width: 50
    }
});
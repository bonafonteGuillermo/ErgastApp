import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  View,
} from 'react-native';

import DriverRow from './DriverRow'
import DriverRowHeader from "./DriverRowHeader";
import ApiClient from './ApiClient'

export default class DriverList extends Component {
                 constructor(props) {
                   super(props);

                   this.apiClient = new ApiClient();
                   this.state = {
                     drivers: [],
                     showActivityIndicator: false
                   };
                 }

                 static navigationOptions = ({ navigation }) => {
                   params = navigation.state.params;
                   return {
                     title: "F1 Standings App",
                     headerTintColor: "white",
                     headerStyle: { backgroundColor: "#a37d00" }
                   };
                 };

                 componentWillMount() {
                   this.loadContent();
                 }

                 loadContent = async () => {
                   this.setState({ showActivityIndicator: true })
                   const drivers = await this.apiClient.getDriverStandings(
                     2019
                   );
                   this.setState({ 
                     drivers: drivers,
                     showActivityIndicator: false 
                    });
                 };

                 render() {
                   if (this.state.showActivityIndicator) {
                     return (
                       <View style={styles.container}>
                         <ActivityIndicator
                           animating={this.state.showActivityIndicator}
                           color='#a37d00'
                           size="large"
                           style={styles.activityIndicator} />
                       </View>
                     )
                   }
                   return (
                     <View style={styles.container}>
                       <FlatList
                         data={this.state.drivers}
                         ListHeaderComponent={
                           this.renderFlatlistStickyHeader
                         }
                         stickyHeaderIndices={[0]}
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

                 renderFlatlistStickyHeader = () => {
                   var stickyHeaderView = (
                     <View style={styles.header_style}>
                       <DriverRowHeader/>
                     </View>
                   );

                   return stickyHeaderView;
                 };

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
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  FlatList,
  Text,
  Modal,
  Image,
  Alert,
  Picker,
  ListHeaderComponent,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import {
  DialogComponent,
  SlideAnimation,
  DialogButton,
  DialogContent,DialogTitle
} from "react-native-dialog-component";
import DriverRow from './DriverRow'
import ApiClient from './ApiClient'

export default class DriverList extends Component {
                 constructor(props) {
                   super(props);

                   this.apiClient = new ApiClient();
                   this.state = {
                     drivers: [],
                     searchYearParam: "2018",
                     filterItems: ["a", "b"]
                   };
                 }

                 static navigationOptions = ({ navigation }) => {
                   params = navigation.state.params;
                   return {
                     title: "F1 Standings App",
                     headerTintColor: "white",
                     headerStyle: { backgroundColor: "#a37d00" },
                     headerRight: (
                       <TouchableWithoutFeedback
                         onPress={navigation.getParam("filterButtonPressed")}
                       >
                         <Image
                           style={{ width: 24, height: 24, marginEnd: 10 }}
                           source={require("./assets/calendar.png")}
                         />
                       </TouchableWithoutFeedback>
                     )
                   };
                 };

                 componentWillMount() {
                   this.loadContent();
                   this.initSearchFilterItems();
                 }

                 componentDidMount() {
                   this.props.navigation.setParams({
                     filterButtonPressed: this._filterButtonPressed
                   });
                 }

                 loadContent = async () => {
                   const drivers = await this.apiClient.getDriverStandings(
                     2018
                   );
                   this.setState({ drivers: drivers });
                 };

                 initSearchFilterItems() {
                   let searchFilterItems = [];
                   for (let year = 1950; year < 2019; year++) {
                     searchFilterItems.push(year);
                   }
                   this.setState({filterItems: searchFilterItems})
                 }

                 _filterButtonPressed = () => {
                   this.dialogComponent.show();
                 };

                 render() {
                   let searchFilterItems = this.state.filterItems.map(
                     (it, index) => {
                       return <Picker.Item key={index} value={it} label={it} />;
                     }
                   );
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

                       <DialogComponent
                         ref={dialogComponent => {
                           this.dialogComponent = dialogComponent;
                         }}
                         dialogTitle={<DialogTitle title="Choose a year" />}
                         dialogAnimation={
                           new SlideAnimation({ slideFrom: "bottom" })
                         }
                         dismissOnTouchOutside={false}
                         width="80%"
                         height="50%"
                       >
                         <DialogContent style={(backgroundColor = "red")}>
                           <View>
                             <Picker
                               selectedValue={this.state.language}
                               style={{ height: 50, width: 100 }}
                               onValueChange={(itemValue, itemIndex) =>
                                 this.setState({ language: itemValue })
                               }
                             >
                               {searchFilterItems}
                             </Picker>
                           </View>
                         </DialogContent>
                       </DialogComponent>
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
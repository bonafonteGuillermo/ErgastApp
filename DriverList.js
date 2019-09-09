import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  View,
} from 'react-native';

import DriverRow from './DriverRow'
import DriverRowHeader from "./DriverRowHeader";
import ApiClient from './ApiClient'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class DriverList extends Component {
  constructor(props) {
    super(props);

    this.apiClient = new ApiClient();
    this.state = {
      drivers: [],
      showActivityIndicator: false,
      selectedYear: 2019,
      disableDecrementYear: false,
      disableIncrementYear: false
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
    const drivers = await this.apiClient.getDriverStandings(this.state.selectedYear);
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
        {this.renderYearSelector()}
        {this.renderTopTableDecorator()}
        {this.renderFlatList()}
      </View>
    );
  }

  renderYearSelector = () => {
    return (

      <View style={styles.yearSelectorContainer}>
        <TouchableWithoutFeedback
          disabled={this.state.disableDecrementYear}
          style={styles.yearSelectorIconContainer}
          onPress={() => { this.decrementYear(this.state.selectedYear) }}
        >
          <Image
            style={{ width: 16, height: 16}}
            source={require('./assets/left_arrow.png')}
          />
        </TouchableWithoutFeedback>
        <View style={styles.yearSelectorValue}>
          <Image
            style={styles.yearSelectorValueImage}
            source={require('./assets/calendar.png')}
          />
          <Text style={styles.yearSelectorValueText}>{this.state.selectedYear}</Text>
        </View> 
        
        <TouchableWithoutFeedback
          disabled={this.state.disableIncrementYear}
          style={styles.yearSelectorIconContainer}
          onPress={() => { this.incrementYear(this.state.selectedYear) }}
        >
          <Image
            style={{ width: 16, height: 16 }}
            source={require('./assets/right_arrow.png')}
          />
        </TouchableWithoutFeedback>

      </View>
    );
  }

  decrementYear(year) {
    if (year === 1950) {
      this.setState({ disableDecrementYear: true })
    } else {
      this.setState({ disableIncrementYear: false })
      this.setState({ selectedYear: year - 1 })
      this.loadContent()
    }
  }

  incrementYear(year) {
    if (year === 2019){
      this.setState({disableIncrementYear: true})
    }else{
      this.setState({ disableDecrementYear: false })
      this.setState({ selectedYear: year + 1 })
      this.loadContent()
    }
  }

  renderTopTableDecorator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "100%",
        backgroundColor: "#a37d00",
      }}
    />
  )
  }

  renderFlatlistStickyHeader = () => {
    var stickyHeaderView = (
      <View style={styles.header_style}>
        <DriverRowHeader/>
      </View>
    );
    return stickyHeaderView;
  };

  renderSeparator = () => { return ( <View style={styles.separator}/> )};

  renderFlatList() {
    return <FlatList 
      data={this.state.drivers} 
      ListHeaderComponent={this.renderFlatlistStickyHeader} 
      keyExtractor={item => item.Driver.familyName}
      ItemSeparatorComponent={this.renderSeparator} 
      stickyHeaderIndices={[0]} 
      renderItem={({ item }) => {
        return (
          <DriverRow 
            title={item.Driver.familyName} 
            points={item.points} 
            onPress={this.onDriverPressed.bind(this, item.Driver)} />
        );
      }} 
    />;
  }

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
      marginTop: 20
  },
  picker: {
      height: 50, 
      width: 50
  },
  yearSelectorContainer: {
    backgroundColor: 'white',
    flexDirection: "row",
    justifyContent: 'flex-start',
    
  },
  yearSelectorValue: {
    flexDirection: "row",
    backgroundColor: '#a37d00',
    paddingTop: 8,
    padding: 7
  },
  yearSelectorValueImage: {
    width: 16, 
    height: 16,
  },
  yearSelectorValueText: {
    marginStart: 8,
    color: 'white',
    fontWeight: 'bold'
  },
  yearSelectorIconContainer: {
    padding: 8,
    backgroundColor: '#D9D9D9'
  },
  separator: {
    height: 1,
    width: "92%",
    backgroundColor: "#CED0CE",
    marginLeft: "4%",
    marginRight: "4%"
  }
});
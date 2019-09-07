import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, Button, TouchableHighlight } from 'react-native'
import WebView from 'react-native-webview'
import ApiClient from './ApiClient';
import LocalStorageManager from './LocalStorageManager';

const favButtonText = {
  ADD: 'Add to favourites',
  REMOVE: 'Remove from favourites'
}

export default class DriverDetail extends Component{

  static navigationOptions = ({ navigation }) => {
      params = navigation.state.params;
      return { 
        title: params.driver.familyName,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#a37d00'
        }
      };
  };

  constructor(props) {
      super(props)

      params = props.navigation.state.params
      this.driverId = params.driver.driverId;
      this.apiClient = new ApiClient();
      this.localStorageManager = new LocalStorageManager();
      this.state = { 
        driver: params.driver,
        isFavDriver : false,
        favButtonText : favButtonText.ADD
      };
  }

  componentWillMount() {
    this.fetchFavourites();
    this.fetchDriverDetails();
  }

  fetchDriverDetails() {
    this.apiClient.getDriverDetails(this.driverId)
      .then((driver) => {
        this.setState({ driver: driver });
      })
      .catch((error) => { console.error(error); });
  }

  fetchFavourites() {
    this.localStorageManager.isDriverSavedLocalStorage(this.state.driver.driverId)
      .then((res) => {
        if (res != null) {
          this.updateStates(true);
        }
        else {
          this.updateStates(false);
        }
      })
      .catch((error) => { console.error(error); });
  }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.renderContent(this.state.driver)}
                {this.renderWebView(this.state.driver.url)}
                {this.renderFavButton()}
            </ScrollView>
        );
    }

    renderContent(driver) {
        return (
          <View style={styles.mainContainer}>
            {this.renderItem("Name",driver.givenName + " " + driver.familyName)}
            {this.renderItem("Number", driver.permanentNumber)}
            {this.renderItem("Date of birth", driver.dateOfBirth)}
          </View>
        );      
    }

    renderItem(title, value) {
      return (
        <View>
          <Text>{title}</Text>
          <Text>{value}</Text>
        </View>
      );
    }

    renderWebView(url) {
      return (
        <WebView
        source={{uri: url}}
      />
      )
    }

    renderFavButton(){
      return (
        <Button
        title= {this.state.favButtonText }
        onPress={() => this.favButtonPressed()}
      />
      )
    }

    favButtonPressed(){
      if(this.state.isFavDriver){
        const res = this.localStorageManager.removeDriverFromLocalStorage(this.state.driver.driverId);
        console.log('removeDriverFromLocalStorage '+res)
        this.updateStates(false)
      }else{
        const res = this.localStorageManager.saveDriverInLocalStorage(this.state.driver.driverId);
        console.log('saveDriverInLocalStorage '+res)
        this.updateStates(true)
      }
    }

    updateStates(isFavDriver){
      if(isFavDriver){
        this.setState({ favButtonText: favButtonText.REMOVE });
        this.setState({ isFavDriver: true })
      }else{
        this.setState({ favButtonText: favButtonText.ADD });
        this.setState({ isFavDriver: false })
      }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  mainContainer: {
    flex: 0,
    justifyContent: "center",
    marginBottom: 5
  },
  item: {
    marginVertical: 5
  },
  dataContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  dataTitle: {
    fontWeight: "bold"
  },
  genre: {
    paddingHorizontal: 2,
    marginHorizontal: 2,
    marginVertical: 1,
    backgroundColor: "lightgray"
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center"
  },
  image: {
    width: 100,
    height: 150
  }
});
import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, View, Button, Alert } from 'react-native'
import ApiClient from './ApiClient';
import LocalStorageManager from './LocalStorageManager';

export default class DriverDetail extends Component{

    static navigationOptions = ({ navigation }) => {
        params = navigation.state.params;

        return { title: params.driver.familyName };
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
          favButtonText : 'Add to favourites'
        };
    }

    componentWillMount() {
      this.localStorageManager.isDriverSavedLocalStorage(this.state.driver.driverId)
      .then((res) => {
        if(res != null){
          console.log('----------->FAV')
          this.setState({ favButtonText: 'Remove from favourites' });
          this.setState({ isFavDriver: true })
        }else{
          console.log('----------->NO FAV')
          this.setState({ favButtonText: 'Add to favourites' });
          this.setState({ isFavDriver: false })
        }
      })
      .catch((error) => { console.error(error) });

      this.apiClient.getDriverDetails(this.driverId)
      .then((driver) => {
          this.setState({ driver: driver });
        })
        .catch((error) => { console.error(error) });
    }

    render() {
        driver = this.state.driver

        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.renderHeader(driver)}
                {this.renderFavButton()}
            </ScrollView>
        );
    }

    renderHeader(driver) {
        return (
          <View style={styles.headerContainer}>
              <View >
                  <Text>{driver.familyName}</Text>
              </View>
          </View>
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
        this.localStorageManager.removeDriverFromLocalStorage(this.state.driver.driverId);
        this.setState({ favButtonText: 'Add to favourites' });
        this.setState({ isFavDriver: false })
      }else{
        this.localStorageManager.saveDriverInLocalStorage(this.state.driver.driverId);
        this.setState({ favButtonText: 'Remove from favourites' });
        this.setState({ isFavDriver: true })
      }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    headerContainer: {
      flex: 0,
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: 5,
    },
    item: {
      marginVertical: 5,
    },
    dataContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dataTitle: {
      fontWeight: 'bold',
    },
    genre: {
      paddingHorizontal: 2,
      marginHorizontal: 2,
      marginVertical: 1,
      backgroundColor: 'lightgray'
    },
    titleContainer: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center',
    },
    image: {
      width: 100,
      height: 150,
    }
  
  });
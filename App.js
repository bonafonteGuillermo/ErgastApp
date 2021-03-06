import React, { Component } from 'react';
import DriverList from './DriverList'
import DriverDetails from './DriverDetails'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

const RootStack = createStackNavigator({
  driverList: {
    screen: DriverList,
  },

  driverDetails: {
    screen: DriverDetails,
  },
});

const AppContainer = createAppContainer(RootStack);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}
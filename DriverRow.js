import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default class DriverRow extends Component
{
  render()
  {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  }
});
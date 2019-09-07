import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class DriverRow extends Component
{
  render()
  {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="lightgray"
      >
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text>{this.props.title}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{this.props.points}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  titleContainer: {
    flex: 5,
    justifyContent: "center"
  },
  pointsContainer: {
    flex: 1,
    justifyContent: "center"
  },
  pointsText: {
    textAlign: "right"
  }
});
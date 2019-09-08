import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { bold } from 'ansi-colors';

export default class DriverRowHeader extends Component
{
  render()
  {
    return (
      <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
          <Text style={styles.nameText}>Name</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>Points</Text>
          </View>
        </View>
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
    paddingBottom: 10,
    backgroundColor: '#E9E9E9'
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
    textAlign: "right",
    fontWeight: 'bold',
    color: '#656565'
  },
  nameText: {
    fontWeight: 'bold',
    color: '#656565'
  }
});
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const LandingGrid = (props) => {
  return (
    <TouchableOpacity style={styles.gridItem}>
      <View
        style={{ ...styles.container, ...{ backgroundColor: props.color } }}
      >
        <Text style={styles.title}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    margin: 15,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: 'flex-start'
  },
  container: {
    
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
  },
  title: {
    fontSize: 22,
    textAlign: 'auto',
  },
});

export default LandingGrid;
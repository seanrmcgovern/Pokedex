import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button
} from "react-native";

const styles = StyleSheet.create({
  buffer: {
    height: 30,
    backgroundColor: "#DE5C58"
  }
});

const Details = props => {
  const { name } = props.route.params;
  return (
    <View>
      <View style={styles.buffer}></View>
      <Text>Details for {name}</Text>

      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default Details;

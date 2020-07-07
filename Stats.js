import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row"
  }
});

const Stats = props => {
  return (
    <View
      style={{
        marginBottom: 5,
        borderBottomWidth: 5,
        borderBottomColor: "#2189DC"
      }}
    >
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>HP</Text>
        </View>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.05 * (props.hp / 10),
            margin: 20,
            marginLeft: 0
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Attack</Text>
        </View>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.05 * (props.attack / 10),
            margin: 20,
            marginLeft: 0
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Defense</Text>
        </View>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.05 * (props.defense / 10),
            margin: 20,
            marginLeft: 0
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Sp. Attack</Text>
        </View>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.05 * (props.specialAttack / 10),
            margin: 20,
            marginLeft: 0
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Sp. Defense</Text>
        </View>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.05 * (props.specialDefense / 10),
            margin: 20,
            marginLeft: 0
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Speed</Text>
        </View>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.05 * (props.speed / 10),
            margin: 20,
            marginLeft: 0
          }}
        ></View>
      </View>
    </View>
  );
};

export default Stats;

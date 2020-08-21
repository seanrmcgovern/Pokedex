import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#D3D3D3"
  },
  num: {
    marginTop: 16,
    marginRight: 5
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
        <Text
          style={{
            marginTop: 16,
            flex: 0.08,
            color: "#2189DC"
          }}
        >
          {props.hp}
        </Text>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.035 * (props.hp / 10),
            margin: 20,
            marginLeft: 0,
            borderRadius: 5
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Attack</Text>
        </View>
        <Text
          style={{
            marginTop: 16,
            flex: 0.08,
            color: "#2189DC"
          }}
        >
          {props.attack}
        </Text>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.035 * (props.attack / 10),
            margin: 20,
            marginLeft: 0,
            borderRadius: 5
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Defense</Text>
        </View>
        <Text
          style={{
            marginTop: 16,
            flex: 0.08,
            color: "#2189DC"
          }}
        >
          {props.defense}
        </Text>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.035 * (props.defense / 10),
            margin: 20,
            marginLeft: 0,
            borderRadius: 5
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Sp. Attack</Text>
        </View>
        <Text
          style={{
            marginTop: 16,
            flex: 0.08,
            color: "#2189DC"
          }}
        >
          {props.specialAttack}
        </Text>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.035 * (props.specialAttack / 10),
            margin: 20,
            marginLeft: 0,
            borderRadius: 5
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Sp. Defense</Text>
        </View>
        <Text
          style={{
            flex: 0.08,
            marginTop: 16,
            color: "#2189DC"
          }}
        >
          {props.specialDefense}
        </Text>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.035 * (props.specialDefense / 10),
            margin: 20,
            marginLeft: 0,
            borderRadius: 5
          }}
        ></View>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 0.25, margin: 12 }}>
          <Text style={{ fontSize: 16 }}>Speed</Text>
        </View>
        <Text
          style={{
            marginTop: 16,
            flex: 0.08,
            color: "#2189DC"
          }}
        >
          {props.speed}
        </Text>
        <View
          style={{
            backgroundColor: "#1CA94C",
            flex: 0.035 * (props.speed / 10),
            margin: 20,
            marginLeft: 0,
            borderRadius: 5
          }}
        ></View>
      </View>
    </View>
  );
};

export default Stats;

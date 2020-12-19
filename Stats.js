import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Separator } from "native-base";

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

const Progress = ({step, steps, height}) => {
  const animatedValue = useRef(new Animated.Value(-250)).current;
  const reactive = useRef(new Animated.Value(-250)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 1500, 
      useNativeDriver: true
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) /steps);
  }, [step, width])
  return (
    <View onLayout={e => {
      const newWidth = e.nativeEvent.layout.width;
      setWidth(newWidth);
      }} 
       style={{height: height, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: height, overflow: 'hidden', flex: 0.6, margin: 20, marginLeft: 0, }}>
      <Animated.View style={{height: height, borderRadius: height, backgroundColor: "#1CA94C", width: '100%', position: 'absolute', left: 0, top: 0, transform: [{translateX: animatedValue}]}}/>
    </View>
  )
} 

const Stats = props => {
  return (
    <View>
      <Separator >
        <Text style={{fontSize: 16}}>Base Stats</Text>
      </Separator>
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
        <Progress step={props.hp} steps={255} height={10}/>
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
        <Progress step={props.attack} steps={255} height={10}/>
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
        <Progress step={props.defense} steps={255} height={10}/>
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
        <Progress step={props.specialAttack} steps={255} height={10}/>
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
        <Progress step={props.specialDefense} steps={255} height={10}/>
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
        <Progress step={props.speed} steps={255} height={10}/>
      </View>
    </View>
  );
};

export default Stats;

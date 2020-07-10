import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import Pokeball from "./assets/pokeball.png";
import { Divider } from "react-native-elements";
import Stats from "./Stats";

const styles = StyleSheet.create({
  buffer: {
    height: 30,
    backgroundColor: "#DE5C58"
  },
  header: {
    alignItems: "center",
    padding: 0,
    margin: 0,
    backgroundColor: "#3F4448",
    backgroundColor: "#DE5C58"
  },
  title: {
    // fontFamily: "PingFangHK-Semibold"
    fontFamily: "Verdana-Bold",
    fontSize: 30,
    color: "white"
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center"
  }
});

const MegaEvolution = props => {
  const { name } = props.route.params;
  const { url } = props.route.params;

  const [abilities, setAblities] = useState([]);

  useEffect(() => {
    axios.get(url).then(res => {
      setAblities(res.data.abilities);
    });
  });

  return <View></View>;
};

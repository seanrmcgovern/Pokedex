import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Card, ListItem, Icon, Button } from "react-native-elements";

const styles = StyleSheet.create({
  card: {
    //width: "31%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 6,
    borderColor: "#2189DC",
    // borderColor: "#00C49A",
    margin: "1%",
    borderRadius: 20,
    //backgroundColor: "#283961"
    backgroundColor: "#485873",
    backgroundColor: "#425069"
  },
  button: {
    padding: 0,
    margin: 0
  },
  title: {
    // fontFamily: "PingFangHK-Semibold"
    fontFamily: "Verdana-Bold",
    color: "white"
  },
  number: {
    // height: "10%",
    color: "white",
    position: "absolute",
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    fontFamily: "PingFangHK-Semibold"
  }
});

const PokeCard = props => {
  // { name, url, navigation }
  const [imageUrl, setImageUrl] = useState();
  const [id, setId] = useState();

  const name = props.name;
  const url = props.url;

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    axios.get(url).then(res => {
      setId(res.data.id);
      setImageUrl(res.data.sprites.front_default);
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Details", { name: capitalize(name) })
      }
    >
      <View style={styles.card}>
        <Text style={styles.number}>{id}</Text>
        <Image
          resizeMode="cover"
          source={{
            uri: imageUrl
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain"
          }}
        />
        <Text style={styles.title}>{capitalize(name)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokeCard;

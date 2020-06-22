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
    borderWidth: 4,
    borderColor: "blue",
    margin: "1%",
    borderRadius: 20,
    backgroundColor: "white"
  },
  button: {
    padding: 0,
    margin: 0
  },
  title: {
    // fontFamily: "PingFangHK-Semibold"
    fontFamily: "Verdana-Bold"
  }
});

const PokeCard = props => {
  // { name, url, navigation }
  const [imageUrl, setImageUrl] = useState();

  const name = props.name;
  const url = props.url;

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    axios.get(url).then(res => {
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
        <Image
          resizeMode="cover"
          source={{
            uri: imageUrl
          }}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <Text style={styles.title}>{capitalize(name)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokeCard;

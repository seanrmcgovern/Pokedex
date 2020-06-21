import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

// import {
//   Container,
//   Header,
//   Content,
//   Card,
//   CardItem,
//   Text,
//   Thumbnail,
//   Button,
//   Icon,
//   Left,
//   Body,
//   Right
// } from "native-base";

const styles = StyleSheet.create({
  card: {
    //width: "31%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "blue",
    margin: "1%"
  }
});

const PokeCard = ({ name, url }) => {
  const [imageUrl, setImageUrl] = useState();

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    // console.log("name: ", name);
    axios.get(url).then(res => {
      // console.log("dat: ", res.data.sprites.front_default);
      setImageUrl(res.data.sprites.front_default);
    });
  }, []);

  return (
    <View style={styles.card}>
      <View>
        <Image
          resizeMode="cover"
          source={{
            uri: imageUrl
          }}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
        <Text>{capitalize(name)}</Text>
      </View>
    </View>
  );
};

export default PokeCard;

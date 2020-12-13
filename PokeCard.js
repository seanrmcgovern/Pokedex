import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import PokeballSprite from "./assets/pokeballSprite.png";
import Pokeball from "./assets/pokeball.png";

const styles = StyleSheet.create({
  card: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#2189DC",
    margin: "2%",
    borderRadius: 20,
    // backgroundColor: "#425069",
    backgroundColor: "#EDEBED"
  },
  button: {
    padding: 0,
    margin: 0
  },
  title: {
    fontFamily: "PingFangHK-Semibold",
    color: "#2189DC"
  },
  number: {
    // height: "10%",
    color: "#DE5C58",
    position: "absolute",
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    fontFamily: "PingFangHK-Semibold"
  }
});

const PokeCard = props => {

  const name = props.name;
  const url = props.url;

  // useEffect(() => {
  //   axios.get(url).then(res => {
  //     setPokemon(res.data);
  //     setImageUrl(res.data.sprites.front_default);
  //     setShiny(res.data.sprites.front_shiny);
  //   });
  // }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Details", {
          name: name,
          image: `data:image/jpeg;base64,${props.image}`,
          id: props.entryId,
          gen: props.gen,
          // shiny: shiny,
          userId: props.userId,
          catchRate: props.catchRate,
          flavor: props.flavor,
          friendship: props.friendship,
          height: props.height,
          weight: props.weight,
          types: props.types,
          stats: props.stats
        });
      }}
    >
      <View style={styles.card}>
        <Text style={styles.number}>{props.entryId}</Text>
        <Image
          resizeMode="cover"
          source={{uri: `data:image/jpeg;base64,${props.image}`}}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginTop: 0
          }}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokeCard;

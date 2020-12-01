import React, { useState, useEffect } from "react";
import axios from "axios";
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
  // { name, url, navigation }
  const [imageUrl, setImageUrl] = useState();
  const [shiny, setShiny] = useState();
  // const [id, setId] = useState();
  const [pokemon, setPokemon] = useState();

  const name = props.name;
  const id = props.entryId;
  const url = props.url;

  const missingImage = !(props.fromCoreData || imageUrl);

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    axios.get(url).then(res => {
      setPokemon(res.data);
      // setId(res.data.id);
      setImageUrl(res.data.sprites.front_default);
      setShiny(res.data.sprites.front_shiny);
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Details", {
          name: capitalize(name),
          pokemon: pokemon,
          image: props.fromCoreData
            ? `data:image/jpeg;base64,${props.image}`
            : imageUrl,
          id: id,
          gen: props.gen,
          shiny: shiny,
          userId: props.userId,
          fromCoreData: props.fromCoreData,
          coreCatchRate: props.catchRate,
          coreFlavor: props.flavor,
          coreFriendship: props.friendship,
          coreHeight: props.height,
          coreWeight: props.weight,
          coreTypes: props.types,
          coreStats: props.stats
        });
      }}
    >
      <View style={styles.card}>
        <Text style={styles.number}>{id}</Text>
        <Image
          resizeMode="cover"
          source={missingImage ? Pokeball : {
            uri: props.fromCoreData
              ? `data:image/jpeg;base64,${props.image}`
              : imageUrl
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginTop: missingImage ? 10 : 0
          }}
        />
        <Text style={styles.title}>{capitalize(name)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokeCard;

import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Pokeball from "../assets/pokeball.png";

const styles = StyleSheet.create({
  card: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#2189DC",
    margin: "1%",
    borderRadius: 20,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#EDEBED"
  },
  button: {
    padding: 0,
    margin: 0
  },
  title: {
    // fontFamily: "PingFangHK-Semibold",
    color: "#2189DC"
  },
  number: {
    color: "#DE5C58",
    position: "absolute",
    top: 0,
    left: 10,
    right: 0,
    bottom: 0,
    // fontFamily: "PingFangHK-Semibold"
  }
});

const PokeCard = props => {

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Details", {
          name: props.pokemon.name,
          pokemon: props.pokemon,
          isNested: false,
        });
      }}
      style={styles.card}
    >
        <Text style={styles.number}>{props.pokemon.id}</Text>
        <Image
          resizeMode="cover"
          source={props.pokemon.image === "" ? Pokeball : {uri: `data:image/jpeg;base64,${props.pokemon.image}`}}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginTop: props.pokemon.image === "" ? 10 : 0
          }}
        />
        <Text style={styles.title}>{props.pokemon.name}</Text>
    </TouchableOpacity>
  );
};

export default PokeCard;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  VirtualizedList,
  FlatList,
  Image
} from "react-native";
import { Dimensions } from "react-native";
import ListRow from "./ListRow";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#DE5C58",
    width: width
  },
  container: {
    flex: 1,
    width: width
  },
  scrollView: {
    backgroundColor: "#DE5C58",
    height: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  row: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#D3D3D3"
  }
});

const ResultsListview = props => {
  const [pokemon, setPokemon] = useState([]);

  const url = "https://pokeapi.co/api/v2/pokedex/" + props.generation + "/";

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const flatlistRef = useRef();

  useEffect(() => {
    if (props.generation === 12) {
      // gen 6 odd edge case with pokedex separation in pokeapi
      let pokeList = [];
      for (let i = 12; i < 15; i++) {
        axios.get("https://pokeapi.co/api/v2/pokedex/" + i + "/").then(res => {
          for (let i = 0; i < res.data.pokemon_entries.length; i++) {
            const entryId = parseInt(
              res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
            );
            if (entryId > 649) {
              pokeList.push({
                ...res.data.pokemon_entries[i],
                entryId: entryId
              });
            }
            pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1));
          }
        });
      }
      setPokemon(pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
    } else {
      axios.get(url).then(res => {
        if (props.generation === 3) {
          // gen 2
          let pokeList = [];
          for (let i = 0; i < res.data.pokemon_entries.length; i++) {
            const entryId = parseInt(
              res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
            );
            if (entryId > 151) {
              pokeList.push({
                ...res.data.pokemon_entries[i],
                entryId: entryId
              });
            }
          }
          setPokemon(pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
        } else if (props.generation === 4) {
          // gen 3
          let pokeList = [];
          for (let i = 0; i < res.data.pokemon_entries.length; i++) {
            const entryId = parseInt(
              res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
            );
            if (entryId > 251) {
              pokeList.push({
                ...res.data.pokemon_entries[i],
                entryId: entryId
              });
            }
          }
          setPokemon(pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
        } else if (props.generation === 6) {
          // gen 4
          let pokeList = [];
          for (let i = 0; i < res.data.pokemon_entries.length; i++) {
            const entryId = parseInt(
              res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
            );
            if (entryId > 386) {
              pokeList.push({
                ...res.data.pokemon_entries[i],
                entryId: entryId
              });
            }
          }
          const darkrai = {
            entryId: 491,
            pokemon_species: {
              name: "Darkrai",
              url: "https://pokeapi.co/api/v2/pokemon-species/491/"
            }
          };
          const shaymin = {
            entryId: 492,
            pokemon_species: {
              name: "Shaymin",
              url: "https://pokeapi.co/api/v2/pokemon-species/492/"
            }
          };
          const arceus = {
            entryId: 493,
            pokemon_species: {
              name: "Arceus",
              url: "https://pokeapi.co/api/v2/pokemon-species/493/"
            }
          };
          setPokemon(
            [...pokeList, darkrai, shaymin, arceus].sort((a, b) =>
              a.entryId > b.entryId ? 1 : -1
            )
          );
        } else if (props.generation === 8) {
          // gen 5
          let pokeList = [];
          for (let i = 0; i < res.data.pokemon_entries.length; i++) {
            const entryId = parseInt(
              res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
            );
            if (entryId > 494) {
              pokeList.push({
                ...res.data.pokemon_entries[i],
                entryId: entryId
              });
            }
          }
          setPokemon(pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
        } else if (props.generation === 16) {
          // gen 7
          let pokeList = [];
          for (let i = 0; i < res.data.pokemon_entries.length; i++) {
            const entryId = parseInt(
              res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
            );
            if (entryId > 721) {
              pokeList.push({
                ...res.data.pokemon_entries[i],
                entryId: entryId
              });
            }
          }
          setPokemon(pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
        } else {
          // gen 1
          setPokemon(res.data.pokemon_entries);
        }
      });
    }
    // flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
  }, [props.generation]);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pokemon}
          ref={flatlistRef}
          //maxToRenderPerBatch={150}
          style={styles.scrollView}
          // contentContainerStyle={{
          //   flexDirection: "row",
          //   flexWrap: "wrap",
          //   paddingBottom: 300,
          //   flexGrow: 1,
          //   justifyContent: "center"
          // }}
          contentContainerStyle={{
            paddingBottom: 370,
            marginLeft: 10,
            marginRight: 10
          }}
          renderItem={({ item, index }) => {
            if (item.pokemon_species.name.includes(props.search))
              return (
                <ListRow
                  name={capitalize(item.pokemon_species.name)}
                  url={
                    item.pokemon_species.url.slice(0, 33) +
                    item.pokemon_species.url.slice(41)
                  }
                  navigation={props.navigation}
                  gen={props.generation}
                  key={index}
                  userId={props.userId}
                ></ListRow>
              );
          }}
          keyExtractor={item => item.pokemon_species.name}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default ResultsListview;

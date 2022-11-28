import React, { useState, useEffect, useRef } from "react";
import PokeCard from "../PokeCard";
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
  Button,
} from "react-native";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#DE5C58",
    width: width,
  },
  container: {
    flex: 1,
    width: width,
    //width: "100%",
    //margin: 14
    // marginHorizontal: "2%"
  },
  scrollView: {
    backgroundColor: "#DE5C58",
    //marginHorizontal: 20,
    height: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const Results = (props) => {
  const [pokemon, setPokemon] = useState([]);

  // axios/fetching is asynchronous, so while fetch is running, react will keep executing code, meaning console.log will run before we actually give response a value
  // fetching data is dependent on real world time, fetching data from another site, so when you compare this to how code runs, it is magnitudes slower
  // Overall: axios/fetch makes the request for the response, takes the result and passes it to the function defined in .then()
  const url = "https://pokeapi.co/api/v2/pokedex/" + props.generation + "/";

  const flatlistRef = useRef();

  useEffect(() => {
    if (props.generation === 12) {
      // gen 6 odd edge case with pokedex separation in pokeapi
      let pokeList = [];
      for (let i = 12; i < 15; i++) {
        axios
          .get("https://pokeapi.co/api/v2/pokedex/" + i + "/")
          .then((res) => {
            for (let i = 0; i < res.data.pokemon_entries.length; i++) {
              const entryId = parseInt(
                res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
              );
              if (entryId > 649) {
                pokeList.push({
                  ...res.data.pokemon_entries[i],
                  entryId: entryId,
                });
              }
            }
          });
      }
      setPokemon(pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
    } else {
      axios.get(url).then((res) => {
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
                entryId: entryId,
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
                entryId: entryId,
              });
            }
          }
          setPokemon(pokeList.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
        } else if (props.generation === 5) {
          // gen 4
          let pokeList = [];
          for (let i = 0; i < res.data.pokemon_entries.length; i++) {
            const entryId = parseInt(
              res.data.pokemon_entries[i].pokemon_species.url.slice(42, -1)
            );
            if (entryId > 386) {
              pokeList.push({
                ...res.data.pokemon_entries[i],
                entryId: entryId,
              });
            }
          }
          const darkrai = {
            entryId: 491,
            pokemon_species: {
              name: "Darkrai",
              url: "https://pokeapi.co/api/v2/pokemon-species/491/",
            },
          };
          const shaymin = {
            entryId: 492,
            pokemon_species: {
              name: "Shaymin",
              url: "https://pokeapi.co/api/v2/pokemon-species/492/",
            },
          };
          const arceus = {
            entryId: 493,
            pokemon_species: {
              name: "Arceus",
              url: "https://pokeapi.co/api/v2/pokemon-species/493/",
            },
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
                entryId: entryId,
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
                entryId: entryId,
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
          //removeClippedSubviews={true}
          maxToRenderPerBatch={150}
          style={styles.scrollView}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingBottom: 400,
            flexGrow: 1,
            justifyContent: "center",
          }}
          renderItem={({ item, index }) => {
            if (item.pokemon_species.name.includes(props.search))
              return (
                <PokeCard
                  navigation={props.navigation}
                  name={item.pokemon_species.name}
                  url={
                    item.pokemon_species.url.slice(0, 33) +
                    item.pokemon_species.url.slice(41)
                  }
                  key={index}
                  gen={props.generation}
                  search={props.search}
                ></PokeCard>
              );
          }}
          keyExtractor={(item) => item.pokemon_species.name}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default Results;

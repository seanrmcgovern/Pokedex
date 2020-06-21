import React, { useState, useEffect } from "react";
import PokeCard from "./PokeCard";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  VirtualizedList,
  FlatList
} from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex"
  },
  container: {
    flex: 1
    //margin: 14
    // marginHorizontal: "2%"
  },
  scrollView: {
    marginHorizontal: 20,
    //width: "100%",
    height: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

const Results = ({ search }) => {
  const [pokemon, setPokemon] = useState([]);

  // axios/fetching is asynchronous, so while fetch is running, react will keep executing code, meaning console.log will run before we actually give response a value
  // fetching data is dependent on real world time, fetching data from another site, so when you compare this to how code runs, it is magnitudes slower
  // Overall: axios/fetch makes the request for the response, takes the result and passes it to the function defined in .then()
  // const url = "https://pokeapi.co/api/v2/pokemon?limit=50";
  // const url = "https://pokeapi.co/api/v2/generation/1/";
  const url = "https://pokeapi.co/api/v2/pokedex/2/";

  useEffect(() => {
    axios.get(url).then(res => {
      // setPokemon(res.data.results);
      // setPokemon(res.data.pokemon_species);
      setPokemon(res.data.pokemon_entries);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemon}
        style={styles.scrollView}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBottom: 200,
          flexGrow: 1,
          justifyContent: "center"
        }}
        renderItem={({ item, index }) => {
          if (item.pokemon_species.name.includes(search))
            return (
              <PokeCard
                name={item.pokemon_species.name}
                url={
                  item.pokemon_species.url.slice(0, 33) +
                  item.pokemon_species.url.slice(41)
                }
                key={index}
              ></PokeCard>
            );
        }}
        keyExtractor={item => item.pokemon_species.name}
        //extraData={selected}
      ></FlatList>
    </SafeAreaView>
    // <SafeAreaView style={styles.container}>
    //   <ScrollView
    //     style={styles.scrollView}
    //     contentContainerStyle={{ paddingBottom: 200 }}
    //   >
    //     <View
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         flexWrap: "wrap"
    //       }}
    //     >
    //       {pokemon.map((poke, index) => {
    //         if (poke.pokemon_species.name.includes(search))
    //           return (
    //             <PokeCard
    //               key={index}
    //               name={poke.pokemon_species.name}
    //               // url={poke.url.slice(0, 33) + poke.url.slice(41)}
    //               url={
    //                 poke.pokemon_species.url.slice(0, 33) +
    //                 poke.pokemon_species.url.slice(41)
    //               }
    //             ></PokeCard>
    //           );
    //       })}
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default Results;

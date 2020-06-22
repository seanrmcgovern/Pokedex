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
import { ButtonGroup } from "react-native-elements";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#DE5C58",
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: "#DE5C58"
    //margin: 14
    // marginHorizontal: "2%"
  },
  scrollView: {
    backgroundColor: "#DE5C58",
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

const Results = props => {
  const [pokemon, setPokemon] = useState([]);
  const [generation, setGeneration] = useState(0);

  const updateGen = index => {
    setGeneration(index);
  };

  // axios/fetching is asynchronous, so while fetch is running, react will keep executing code, meaning console.log will run before we actually give response a value
  // fetching data is dependent on real world time, fetching data from another site, so when you compare this to how code runs, it is magnitudes slower
  // Overall: axios/fetch makes the request for the response, takes the result and passes it to the function defined in .then()
  // const url = "https://pokeapi.co/api/v2/pokemon?limit=50";
  // const url = "https://pokeapi.co/api/v2/generation/1/";
  const url = "https://pokeapi.co/api/v2/pokedex/" + (generation + 2) + "/";
  // const url = "https://pokeapi.co/api/v2/pokedex/2";

  useEffect(() => {
    axios.get(url).then(res => {
      // setPokemon(res.data.results);
      // setPokemon(res.data.pokemon_species);
      setPokemon(res.data.pokemon_entries);
    });
  }, []);

  useEffect(() => {
    axios.get(url).then(res => {
      setPokemon(res.data.pokemon_entries);
    });
  }, [generation]);

  const button1 = () => <Text>1</Text>;
  const button2 = () => <Text>2</Text>;
  const button3 = () => <Text>3</Text>;
  const button4 = () => <Text>4</Text>;
  const button5 = () => <Text>5</Text>;
  const button6 = () => <Text>6</Text>;
  const button7 = () => <Text>7</Text>;
  const buttons = [
    { element: button1 },
    { element: button2 },
    { element: button3 },
    { element: button4 },
    { element: button5 },
    { element: button6 },
    { element: button7 }
  ];

  return (
    <View style={styles.wrapper}>
      <ButtonGroup
        onPress={updateGen}
        selectedIndex={generation}
        buttons={buttons}
        containerStyle={{ height: 30 }}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pokemon}
          style={styles.scrollView}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingBottom: 250,
            flexGrow: 1,
            justifyContent: "center"
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
                ></PokeCard>
              );
          }}
          keyExtractor={item => item.pokemon_species.name}
        ></FlatList>
      </SafeAreaView>
    </View>

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

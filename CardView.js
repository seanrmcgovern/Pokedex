import React, { useState, useEffect, useRef } from "react";
import PokeCard from "./PokeCard";
import axios from "axios";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  NativeModules
} from "react-native";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#DE5C58",
    width: width
  },
  container: {
    flex: 1,
    width: width
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
    bottom: 0
  }
});

const CardView = props => {
  const [pokemon, setPokemon] = useState([]);

  const flatlistRef = useRef();

  // const fetchPokeApi = () => {
  //     const url = "https://pokeapi.co/api/v2/generation/" + props.generation + "/";
  //     axios.get(url).then(res => {
  //         // establish list of pokemon for given generation
  //         let pokedex = res.data.pokemon_species.map((item) => {
  //           const id = parseInt(item.url.slice(42, -1));
  //           return {entryId: id, name: item.name, url: item.url};
  //         });
  //         setPokemon(pokedex.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
  //     });
  // }

  useEffect(() => {
    // if (!props.generationSaved) {
    //   fetchPokeApi();
    // } else {
    //   NativeModules.PokeCardBridge.getGeneration(props.generation, cards => {
    //     setPokemon(cards);
    //   });
    // }
    NativeModules.PokeCardBridge.getGeneration(props.generation, cards => {
      setPokemon(cards);
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* {!props.generationSaved && (
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
              justifyContent: "center"
            }}
            renderItem={({ item, index }) => {
              if (item.name.includes(props.search))
                return (
                  <PokeCard
                    navigation={props.navigation}
                    key={index}
                    search={props.search}
                    userId={props.userId}
                    name={item.name}
                    url={                                 //////////////////
                      item.url.slice(0, 33) +
                      item.url.slice(41)
                    }
                    gen={props.generation}
                    entryId={item.entryId}
                    fromCoreData={false}
                  ></PokeCard>
                );
            }}
            keyExtractor={item => item.name}
          ></FlatList>
        </SafeAreaView>
      )} */}
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
              justifyContent: "center"
            }}
            renderItem={({ item, index }) => {
              if (item.name.toLowerCase().includes(props.search))
                return (
                  <PokeCard
                    // not sent/fetched from coredata
                    navigation={props.navigation}
                    key={index}
                    search={props.search}
                    userId={props.userId}
                    // stored in CoreData
                    name={item.name}
                    gen={item.generation}
                    entryId={item.id}
                    catchRate={item.catchRate}
                    flavor={item.flavor}
                    friendship={item.friendship}
                    height={item.height}
                    weight={item.weight}
                    image={item.image}
                    types={item.types}
                    stats={item.stats}
                  ></PokeCard>
                );
            }}
            keyExtractor={item => item.name}
          ></FlatList>
        </SafeAreaView>
    </View>
  );
};

export default CardView;

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    axios.get(url).then(res => {
      setPokemon(res.data.pokemon_entries);
    });
  }, [props.generation]);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pokemon}
          //removeClippedSubviews={true}
          maxToRenderPerBatch={150}
          style={styles.scrollView}
          // contentContainerStyle={{
          //   flexDirection: "row",
          //   flexWrap: "wrap",
          //   paddingBottom: 300,
          //   flexGrow: 1,
          //   justifyContent: "center"
          // }}
          renderItem={({ item, index }) => {
            if (item.pokemon_species.name.includes(props.search))
              return (
                // <PokeCard
                //   navigation={props.navigation}
                //   name={item.pokemon_species.name}
                //   url={
                //     item.pokemon_species.url.slice(0, 33) +
                //     item.pokemon_species.url.slice(41)
                //   }
                //   key={index}
                //   gen={props.generation}
                // ></PokeCard>
                <ListRow
                  name={capitalize(item.pokemon_species.name)}
                  url={
                    item.pokemon_species.url.slice(0, 33) +
                    item.pokemon_species.url.slice(41)
                  }
                  navigation={props.navigation}
                  gen={props.generation}
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

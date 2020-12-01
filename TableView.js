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

const TableView = props => {
    const [pokemon, setPokemon] = useState([]);

    const capitalize = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const flatlistRef = useRef();
  
    const fetchPokeApi = () => {
        const url = "https://pokeapi.co/api/v2/generation/" + props.generation + "/";
        axios.get(url).then(res => {
            // establish list of pokemon for given generation
            let pokedex = res.data.pokemon_species.map((item) => {
              const id = parseInt(item.url.slice(42, -1));
              return {entryId: id, name: item.name, url: item.url};
            });
            setPokemon(pokedex.sort((a, b) => (a.entryId > b.entryId ? 1 : -1)));
        });
    }
  
    useEffect(() => {
      if (!props.generationSaved) {
        fetchPokeApi();
      } else {
        NativeModules.PokeCardBridge.getGeneration(props.generation, cards => {
          setPokemon(cards);
        });
      }
    }, [props.generationSaved]);

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
            if (item.name.includes(props.search))
              return (
                <ListRow
                  name={capitalize(item.name)}
                  url={
                    item.url.slice(0, 33) +
                    item.url.slice(41)
                  }
                  navigation={props.navigation}
                  gen={props.generation}
                  key={index}
                  userId={props.userId}
                ></ListRow>
              );
          }}
          keyExtractor={item => item.name}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default TableView;

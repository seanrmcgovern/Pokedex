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

const Results = props => {
  const [pokemon, setPokemon] = useState([]);
  const [generation, setGeneration] = useState(2);
  const [index, setIndex] = useState(0);

  const updateGen = index => {
    setIndex(index);
    if (index <= 3) {
      setGeneration(index + 2);
    } else if (index === 4) {
      setGeneration(8); // unova dex
    } else if (index === 5) {
      setGeneration(12); // kalos dex
    } else if (index === 6) {
      setGeneration(16); // original alola dex
    }
  };

  // axios/fetching is asynchronous, so while fetch is running, react will keep executing code, meaning console.log will run before we actually give response a value
  // fetching data is dependent on real world time, fetching data from another site, so when you compare this to how code runs, it is magnitudes slower
  // Overall: axios/fetch makes the request for the response, takes the result and passes it to the function defined in .then()
  const url = "https://pokeapi.co/api/v2/pokedex/" + generation + "/";

  useEffect(() => {
    axios.get(url).then(res => {
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
    { element: button5 }
    // { element: button6 },
    // { element: button7 }
  ];

  return (
    <View style={styles.wrapper}>
      <ButtonGroup
        onPress={updateGen}
        selectedIndex={index}
        buttons={buttons}
        containerStyle={{ height: 30 }}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pokemon}
          //removeClippedSubviews={true}
          maxToRenderPerBatch={150}
          style={styles.scrollView}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingBottom: 300,
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
                  gen={generation}
                ></PokeCard>
              );
          }}
          keyExtractor={item => item.pokemon_species.name}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default Results;

import React, { useState, useEffect, useRef, useCallback } from "react";
import PokeCard from "./PokeCard";
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

  const renderCard = useCallback(
    ({ item }) => {
      if (item.name.toLowerCase().includes(props.search))
        return (
          <PokeCard
            // not sent/fetched from coredata
            navigation={props.navigation}
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
            shiny={item.shiny}
            types={item.types}
            stats={item.stats}
            abilities={item.abilities}
          ></PokeCard>
        );
    }
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  useEffect(() => {
    NativeModules.PokeCardBridge.getGeneration(props.generation, cards => {
      setPokemon(cards);
    });
  }, []);

  return (
    <View style={styles.wrapper}>
        <FlatList
          data={pokemon}
          ref={flatlistRef}
          style={styles.scrollView}
          contentContainerStyle={{
            paddingBottom: 400,
            justifyContent: "center",
            alignItems:'center'
          }}
          numColumns={3}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
        ></FlatList>
    </View>
  );
};

export default CardView;

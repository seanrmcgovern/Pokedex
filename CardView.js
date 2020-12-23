import React, { useState, useEffect, useRef, useCallback } from "react";
import PokeCard from "./PokeCard";
import {
  StyleSheet,
  View,
  FlatList
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

  const renderCard = useCallback(
    ({ item }) => {
        return (
          <PokeCard
            navigation={props.navigation}
            userId={props.userId}
            pokemon={item}
          ></PokeCard>
        );
    }
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.wrapper}>
        <FlatList
          data={props.pokemon.filter(item => item.name.toLowerCase().includes(props.search))}
          style={styles.scrollView}
          contentContainerStyle={{
            paddingBottom: 400,
            justifyContent: "center",
            alignItems:'center'
          }}
          numColumns={3}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          removeClippedSubviews
        ></FlatList>
    </View>
  );
};

export default CardView;

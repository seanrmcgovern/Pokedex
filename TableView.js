import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  NativeModules
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

    const flatlistRef = useRef();

    useEffect(() => {
      NativeModules.PokeCardBridge.getGeneration(props.generation, cards => {
        setPokemon(cards);
      });
    })

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pokemon}
          ref={flatlistRef}
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
            if (item.name.toLowerCase().includes(props.search))
              return (
                <ListRow
                  navigation={props.navigation}
                  key={index}
                  userId={props.userId}
                  name={item.name}
                  // stored in CoreData
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

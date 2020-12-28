import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList
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

  const renderRow = useCallback(
      ({ item }) => {
          return (
            <ListRow
              navigation={props.navigation}
              userId={props.userId}
              pokemon={item}
            ></ListRow>
          );
      }
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={props.pokemon.filter(item => item.name.toLowerCase().includes(props.search))}
          style={styles.scrollView}
          // contentContainerStyle={{
          //   flexDirection: "row",
          //   flexWrap: "wrap",
          //   paddingBottom: 400,
          //   flexGrow: 1,
          //   justifyContent: "center"
          // }}
          contentContainerStyle={{
            paddingBottom: 400,
            marginLeft: 10,
            marginRight: 10
          }}
          renderItem={renderRow}
          keyExtractor={keyExtractor}
          removeClippedSubviews={false}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default TableView;

import React, { useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import PokeCard from "./PokeCard";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#DE5C58",
    borderTopWidth: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const CardView = (props) => {
  const renderCard = useCallback(({ item }) => {
    return <PokeCard navigation={props.navigation} pokemon={item}></PokeCard>;
  });

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={props.pokemon.filter((item) =>
          item.name.toLowerCase().includes(props.search)
        )}
        style={styles.scrollView}
        contentContainerStyle={{
          // paddingBottom: Platform.OS === 'ios' ? 400 : 500,
          justifyContent: "center",
          alignItems: "center",
          // flexGrow: 1
        }}
        numColumns={3}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        removeClippedSubviews={false}
        bounces={true}
      ></FlatList>
    </View>
  );
};

export default CardView;

import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList
} from "react-native";
import ListRow from "./ListRow";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
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
      <FlatList
        data={props.pokemon.filter(item => item.name.toLowerCase().includes(props.search))}
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 400 : 500,
          marginLeft: 10,
          marginRight: 10
        }}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        removeClippedSubviews={false}
        bounces={true}
      ></FlatList>
    </View>
  );
};

export default TableView;

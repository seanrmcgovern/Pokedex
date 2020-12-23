import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import { SearchBar } from "react-native-elements";
import CardView from "./CardView";
import TableView from "./TableView";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DE5C58",
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  input: {
    backgroundColor: "white"
  }
});

const GenerationView = props => {
  const [search, setSearch] = useState("");

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View>
      <SearchBar
        lightTheme={true}
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.container}
        inputContainerStyle={styles.input}
      />
      {props.viewCards ? (
        <CardView search={search.toLowerCase()} navigation={props.navigation} generation={props.generation} pokemon={props.pokemon} userId={props.userId}/>
      ) : (
        <TableView search={search.toLowerCase()} navigation={props.navigation} generation={props.generation} pokemon={props.pokemon} userId={props.userId}/>
      )}
    </View>
  );
};

export default GenerationView;

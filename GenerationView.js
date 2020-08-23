import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import Results from "./Results";
import ResultsListview from "./ResultsListview";

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
        <Results
          search={search.toLowerCase()}
          navigation={props.navigation}
          generation={props.generation}
          userId={props.userId}
        ></Results>
      ) : (
        <ResultsListview
          search={search.toLowerCase()}
          navigation={props.navigation}
          generation={props.generation}
          userId={props.userId}
        ></ResultsListview>
      )}
    </View>
  );
};

export default GenerationView;

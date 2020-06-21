import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import Results from "./Results";

const styles = StyleSheet.create({
  buffer: {
    height: 30,
    backgroundColor: "#DE5C58"
  },
  container: {
    backgroundColor: "#DE5C58",
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  input: {
    backgroundColor: "white"
  }
});

const Header = () => {
  const [search, setSearch] = useState("");

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View>
      <View style={styles.buffer}></View>
      <SearchBar
        lightTheme={true}
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.container}
        //inputStyle={styles.input}
        inputContainerStyle={styles.input}
      />
      {/* <TouchableOpacity onPress={console.log(search)}></TouchableOpacity> */}
      <Results search={search.toLowerCase()}></Results>
    </View>
  );
};

export default Header;

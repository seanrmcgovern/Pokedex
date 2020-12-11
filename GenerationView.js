import React, { useState, useEffect } from "react";
import { View, StyleSheet, NativeModules } from "react-native";
import { SearchBar } from "react-native-elements";
import CardView from "./CardView";
import TableView from "./TableView";
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

  const [generationSaved, setGenerationSaved] = useState();

  const refreshDownloads = () => {
    switch (props.generation) {
      case 1:
        NativeModules.PokeCardBridge.isKantoSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 2:
        NativeModules.PokeCardBridge.isJohtoSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 3:
        NativeModules.PokeCardBridge.isHoennSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 4:
        NativeModules.PokeCardBridge.isSinnohSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 5:
        NativeModules.PokeCardBridge.isUnovaSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 6:
        NativeModules.PokeCardBridge.isKalosSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 7:
        NativeModules.PokeCardBridge.isAlolaSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 8:
        NativeModules.PokeCardBridge.isGalarSaved(val => {
          setGenerationSaved(val);
        });
        break;
    }
  };

  useEffect(() => {
    refreshDownloads();
  }, []);

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
        <CardView search={search.toLowerCase()} navigation={props.navigation} generation={props.generation} userId={props.userId} generationSaved={generationSaved}/>
      ) : (
        <TableView search={search.toLowerCase()} navigation={props.navigation} generation={props.generation} userId={props.userId} generationSaved={generationSaved}/>
      )}
    </View>
  );
};

export default GenerationView;

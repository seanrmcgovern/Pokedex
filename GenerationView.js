import React, { useState, useEffect } from "react";
import { View, StyleSheet, NativeModules } from "react-native";
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

  const [generationSaved, setGenerationSaved] = useState();

  const refreshDownloads = () => {
    switch (props.generation) {
      case 2:
        NativeModules.UserInfo.isKantoSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 3:
        NativeModules.UserInfo.isJohtoSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 4:
        NativeModules.UserInfo.isHoennSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 5:
        NativeModules.UserInfo.isSinnohSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 8:
        NativeModules.UserInfo.isUnovaSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 12:
        NativeModules.UserInfo.isKalosSaved(val => {
          setGenerationSaved(val);
        });
        break;
      case 16:
        NativeModules.UserInfo.isAlolaSaved(val => {
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
        <Results
          search={search.toLowerCase()}
          navigation={props.navigation}
          generation={props.generation}
          userId={props.userId}
          generationSaved={generationSaved}
        ></Results>
      ) : (
        <ResultsListview
          search={search.toLowerCase()}
          navigation={props.navigation}
          generation={props.generation}
          userId={props.userId}
          generationSaved={generationSaved}
        ></ResultsListview>
      )}
    </View>
  );
};

export default GenerationView;

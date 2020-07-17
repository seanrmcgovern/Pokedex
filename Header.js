import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import Results from "./Results";
import { Button, ButtonGroup } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import ResultsListview from "./ResultsListview";

const width = Dimensions.get("window").width;

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
  },
  wrapper: {
    backgroundColor: "#DE5C58",
    width: width
  },
  headerIcon: {
    paddingRight: 10
  }
});

const Header = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            toggleIcon(viewCards);
          }}
          title=""
          icon={
            <Icon
              name={viewCards ? "list-ul" : "th-large"}
              size={26}
              color="white"
              style={styles.headerIcon}
            />
          }
        />
      )
    });
  }, [navigation]);

  const toggleIcon = currentViewisCards => {
    setViewCards(viewCards => !viewCards);
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            toggleIcon(!currentViewisCards);
          }}
          title=""
          icon={
            <Icon
              name={currentViewisCards ? "th-large" : "list-ul"}
              size={26}
              color="white"
              style={styles.headerIcon}
            />
          }
        />
      )
    });
  };

  const [search, setSearch] = useState("");

  const updateSearch = search => {
    setSearch(search);
  };

  const [generation, setGeneration] = useState(2);
  const [index, setIndex] = useState(0);

  const updateGen = index => {
    setIndex(index);
    if (index <= 3) {
      setGeneration(index + 2);
    } else if (index === 4) {
      setGeneration(8); // unova dex
    } else if (index === 5) {
      setGeneration(12); // kalos dex
    } else if (index === 6) {
      setGeneration(16); // original alola dex
    }
  };

  const button1 = () => <Text>1</Text>;
  const button2 = () => <Text>2</Text>;
  const button3 = () => <Text>3</Text>;
  const button4 = () => <Text>4</Text>;
  const button5 = () => <Text>5</Text>;
  const buttons = [
    { element: button1 },
    { element: button2 },
    { element: button3 },
    { element: button4 },
    { element: button5 }
  ];

  const [viewCards, setViewCards] = useState(true);

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
      <View style={styles.wrapper}>
        <ButtonGroup
          onPress={updateGen}
          selectedIndex={index}
          buttons={buttons}
          containerStyle={{ height: 30 }}
        />
      </View>
      {viewCards && (
        <Results
          search={search.toLowerCase()}
          navigation={navigation}
          generation={generation}
        ></Results>
      )}
      {!viewCards && (
        <ResultsListview
          search={search.toLowerCase()}
          navigation={navigation}
          generation={generation}
        ></ResultsListview>
      )}
    </View>
  );
};

export default Header;

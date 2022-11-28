import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Container, Tab, Tabs, ScrollableTab } from "native-base";
import kantoData from "../data/kanto.json";
import johtoData from "../data/johto.json";
import hoennData from "../data/hoenn.json";
import sinnohData from "../data/sinnoh.json";
import unovaData from "../data/unova.json";
import kalosData from "../data/kalos.json";
import alolaData from "../data/alola.json";
import galarData from "../data/galar.json";
import GenerationView from "./GenerationView";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  buffer: {
    height: 30,
    backgroundColor: "#DE5C58",
  },
  container: {
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  input: {
    backgroundColor: "white",
  },
  wrapper: {
    backgroundColor: "#DE5C58",
    width: width,
  },
  leftHeaderIcon: {
    paddingLeft: 10,
  },
  rightHeaderIcon: {
    paddingRight: 10,
  },
  activeTab: {
    color: "#2189DC",
  },
  inactiveTab: {
    color: "#2189DC",
    opacity: 0.6,
  },
  tabLine: {
    backgroundColor: "#2189DC",
  },
});

const DashBoard = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.toggleDrawer();
          }}
          title=""
          icon={
            <Icon
              name={"angle-double-right"}
              size={28}
              color="white"
              style={styles.leftHeaderIcon}
            />
          }
        />
      ),
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
              style={styles.rightHeaderIcon}
            />
          }
        />
      ),
    });
  }, [navigation]);

  const toggleIcon = (currentViewisCards) => {
    setViewCards((viewCards) => !viewCards);
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
              style={styles.rightHeaderIcon}
            />
          }
        />
      ),
    });
  };

  const [viewCards, setViewCards] = useState(true);

  const genTabs = [
    { heading: "Kanto", gen: 1, data: kantoData },
    { heading: "Johto", gen: 2, data: johtoData },
    { heading: "Hoenn", gen: 3, data: hoennData },
    { heading: "Sinnoh", gen: 4, data: sinnohData },
    { heading: "Unova", gen: 5, data: unovaData },
    { heading: "Kalos", gen: 6, data: kalosData },
    { heading: "Alola", gen: 7, data: alolaData },
    { heading: "Galar", gen: 8, data: galarData },
  ];

  const prerenderCount = Platform.OS === "ios" ? 7 : 0;

  return (
    <Container>
      <Tabs
        renderTabBar={() => <ScrollableTab />}
        tabBarUnderlineStyle={styles.tabLine}
        prerenderingSiblingsNumber={prerenderCount}
        tabContainerStyle={{ backgroundColor: "white" }}
      >
        {genTabs.map((tab, index) => {
          return (
            <Tab
              heading={tab.heading}
              tabStyle={{ backgroundColor: "white" }}
              activeTabStyle={{ backgroundColor: "white" }}
              activeTextStyle={styles.activeTab}
              textStyle={styles.inactiveTab}
              key={index}
            >
              <GenerationView
                navigation={navigation}
                generation={tab.gen}
                pokemon={tab.data}
                viewCards={viewCards}
              />
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
};

export default DashBoard;

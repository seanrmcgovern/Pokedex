import React, { useState } from "react";
import { StyleSheet } from "react-native";
import GenerationView from "./GenerationView";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import { Container, Tab, Tabs, ScrollableTab } from "native-base";
import kantoData from "./kanto.json";
import johtoData from "./johto.json";
import hoennData from "./hoenn.json";
import sinnohData from "./sinnoh.json";
import unovaData from "./unova.json";
import kalosData from "./kalos.json";
import alolaData from "./alola.json";
import galarData from "./galar.json";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  buffer: {
    height: 30,
    backgroundColor: "#DE5C58"
  },
  container: {
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
  },
  activeTab: {
    color: "#2189DC"
  },
  tabLine: {
    backgroundColor: "#2189DC"
  }
});

const DashBoard = ({ navigation, route, userId }) => {
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

  const [viewCards, setViewCards] = useState(true);

  const genTabs = [{heading: "Kanto", gen: 1, data: kantoData}, 
                   {heading: "Johto", gen: 2, data: johtoData}, 
                   {heading: "Hoenn", gen: 3, data: hoennData}, 
                   {heading: "Sinnoh", gen: 4, data: sinnohData}, 
                   {heading: "Unova", gen: 5, data: unovaData}, 
                   {heading: "Kalos", gen: 6, data: kalosData}, 
                   {heading: "Alola", gen: 7, data: alolaData}, 
                   {heading: "Galar", gen: 8, data: galarData}
                  ];

  return (
    <Container>
      {/* // change prerendered siblings number to depend on the OS, 7 for iOS, 0 for Android */}
      <Tabs renderTabBar={() => <ScrollableTab/>} tabBarUnderlineStyle={styles.tabLine} prerenderingSiblingsNumber={7} tabContainerStyle={{backgroundColor: "white"}}>
        {genTabs.map((tab, index) => {
          return (
            <Tab heading={tab.heading} tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: "white"}} activeTextStyle={styles.activeTab} key={index}>
              <GenerationView navigation={navigation} generation={tab.gen} pokemon={tab.data} userId={userId} viewCards={viewCards}/>
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
};

export default DashBoard;

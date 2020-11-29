import React, { useState } from "react";
import { StyleSheet } from "react-native";
import GenerationView from "./GenerationView";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import { Container, Tab, Tabs, ScrollableTab } from "native-base";

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

  const genTabs = [{heading: "Kanto", gen: 1}, {heading: "Johto", gen: 2}, {heading: "Hoenn", gen: 3}, {heading: "Sinnoh", gen: 4}, {heading: "Unova", gen: 5}, {heading: "Kalos", gen: 6}, {heading: "Alola", gen: 7}, {heading: "Galar", gen: 8}];

  return (
    <Container>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        {genTabs.map((tab) => {
          return (
            <Tab heading={tab.heading}>
              <GenerationView navigation={navigation} generation={tab.gen} userId={userId} viewCards={viewCards}/>
            </Tab>
          );
        })}
        {/* <Tab heading="Kanto">
          <GenerationView
            navigation={navigation}
            generation={2}
            userId={userId}
            viewCards={viewCards}
          ></GenerationView>
        </Tab>
        <Tab heading="Johto">
          <GenerationView
            navigation={navigation}
            generation={3}
            userId={userId}
            viewCards={viewCards}
          ></GenerationView>
        </Tab>
        <Tab heading="Hoenn">
          <GenerationView
            navigation={navigation}
            generation={4}
            userId={userId}
            viewCards={viewCards}
          ></GenerationView>
        </Tab>
        <Tab heading="Sinnoh">
          <GenerationView
            navigation={navigation}
            generation={6}
            userId={userId}
            viewCards={viewCards}
          ></GenerationView>
        </Tab>
        <Tab heading="Unova">
          <GenerationView
            navigation={navigation}
            generation={8}
            userId={userId}
            viewCards={viewCards}
          ></GenerationView>
        </Tab>
        <Tab heading="Kalos">
          <GenerationView
            navigation={navigation}
            generation={12}
            userId={userId}
            viewCards={viewCards}
          ></GenerationView>
        </Tab>
        <Tab heading="Alola">
          <GenerationView
            navigation={navigation}
            generation={16}
            userId={userId}
            viewCards={viewCards}
          ></GenerationView>
        </Tab> */}
      </Tabs>
    </Container>
  );
};

export default DashBoard;

import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import Parties from "./Parties";
import Favorites from "./Favorites";

const styles = StyleSheet.create({
  activeTab: {
    color: "#2189DC"
  },
  tabLine: {
    backgroundColor: "#2189DC"
  }
});

const Profile = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#DE5C58" }}>
      <Container>
        <Tabs tabBarUnderlineStyle={styles.tabLine} locked>
          <Tab heading="Parties" activeTextStyle={styles.activeTab} activeTabStyle={styles.activeTab}>
            <Parties navigation={navigation}></Parties>
          </Tab>
          <Tab heading="Favorites" activeTextStyle={styles.activeTab}>
            <Favorites navigation={navigation} />
          </Tab>
        </Tabs>
      </Container>
    </View>
  );
};

export default Profile;

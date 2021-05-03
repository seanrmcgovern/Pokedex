import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Parties from "./Parties";
import Favorites from "./Favorites";

const styles = StyleSheet.create({
  activeTab: {
    color: "#2189DC"
  },
  inactiveTab: {
    color: "#2189DC",
    opacity: 0.6
  },
  tabLine: {
    backgroundColor: "#2189DC"
  },
  leftHeaderIcon: {
    paddingLeft: 10
  },
});

const Profile = ({ navigation, route }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.toggleDrawer()
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
        <></>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#DE5C58" }}>
      <Container>
        <Tabs tabBarUnderlineStyle={styles.tabLine} locked>
          <Tab heading="Parties" tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: "white"}} activeTextStyle={styles.activeTab} textStyle={styles.inactiveTab}>
            <Parties navigation={navigation}></Parties>
          </Tab>
          <Tab heading="Favorites" tabStyle={{backgroundColor: 'white'}} activeTabStyle={{backgroundColor: "white"}} activeTextStyle={styles.activeTab} textStyle={styles.inactiveTab}>
            <Favorites navigation={navigation} />
          </Tab>
        </Tabs>
      </Container>
    </View>
  );
};

export default Profile;

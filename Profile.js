import React from "react";
import { Text, View } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import Parties from "./Parties";
import Favorites from "./Favorites";
import Settings from "./Settings";

const Profile = ({ navigation, route, userId }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#DE5C58" }}>
      <Container>
        <Tabs locked>
          <Tab heading="Parties">
            <Parties navigation={navigation} userId={userId}></Parties>
          </Tab>
          <Tab heading="Favorites">
            <Favorites navigation={navigation} userId={userId} />
          </Tab>
          <Tab heading="Settings">
            <Settings navigation={navigation} userId={userId} />
          </Tab>
        </Tabs>
      </Container>
    </View>
  );
};

export default Profile;

import React from "react";
import { Text, View } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import Parties from "./Parties";

const Profile = ({ navigation, route, userId }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#DE5C58" }}>
      <Container>
        <Tabs locked>
          <Tab heading="Parties">
            <Parties navigation={navigation} userId={userId}></Parties>
          </Tab>
          <Tab heading="Favorites">
            <Text>Favorites</Text>
          </Tab>
        </Tabs>
      </Container>
    </View>
  );
};

export default Profile;

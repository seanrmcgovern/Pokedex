import React from "react";
import { Text, View } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import Parties from "./Parties";

const Profile = props => {
  return (
    <View style={{ flex: 1, backgroundColor: "#DE5C58" }}>
      <Container>
        <Tabs>
          <Tab heading="Parties">
            <Parties userId={props.userId}></Parties>
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

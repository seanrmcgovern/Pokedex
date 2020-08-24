import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Overlay, Input } from "react-native-elements";
import PartyList from "./PartyList";
import Icon from "react-native-vector-icons/FontAwesome";

const Parties = props => {
  const [parties, setParties] = useState([]);

  const addParty = name => {
    const newName = name === "" ? "New Party" : name;
    firebase
      .database()
      .ref("users/" + props.userId + "/parties")
      .set([...parties, { title: newName, items: [{ name: "head" }] }]);
  };

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const close = () => {
    setNewParty("");
    toggleOverlay();
  };

  const [newParty, setNewParty] = useState("");

  useEffect(() => {
    firebase
      .database()
      .ref("users/" + props.userId)
      .on("value", snapshot => {
        const curParties = snapshot.val().parties;
        setParties(curParties);
      });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, zIndex: 1, elevation: 1 }}
      scrollEventThrottle={16}
    >
      <View style={{ height: 1000, backgroundColor: "#DE5C58" }}>
        {parties.map((party, index) => (
          <PartyList title={party.title} party={party.items}></PartyList>
        ))}
        <TouchableOpacity onPress={toggleOverlay} style={{ height: 80 }}>
          <View
            style={{
              backgroundColor: "#2189DC",
              padding: 15,
              display: "flex",
              borderBottomWidth: 0.5,
              borderBottomColor: "#D3D3D3",
              alignItems: "center"
            }}
          >
            <Icon name="plus-square" size={40} color="white"></Icon>
          </View>
        </TouchableOpacity>
        <Overlay
          isVisible={visible}
          onBackdropPress={close}
          overlayStyle={{ width: "70%" }}
        >
          <Text
            style={{
              color: "#2189DC",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10
            }}
          >
            Enter Party Info
          </Text>
          <Input
            placeholder="Ex: New-Party-Name"
            label="Name"
            onChangeText={text => setNewParty(text)}
            value={newParty}
          />
          <View>
            <Button
              onPress={() => {
                addParty(newParty);
                close();
              }}
              title="Create Party"
            />
          </View>
        </Overlay>
      </View>
    </ScrollView>
  );
};

export default Parties;

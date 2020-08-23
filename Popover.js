import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import axios from "axios";
import { ListItem, Overlay, Input, Button } from "react-native-elements";
import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Toast } from "native-base";

const Popover = props => {
  const [parties, setParties] = useState([]);
  const [newParty, setNewParty] = useState("");

  const createParty = name => {
    const newName = name === "" ? "New Party" : name;
    firebase
      .database()
      .ref("users/" + props.userId + "/parties")
      .set([
        ...parties,
        { title: newName, items: [{ name: "head" }, props.pokeObject] }
      ]);
    props.showToast(`Created party: "${name}" with ${props.pokeObject.name}`);
    setNewParty("");
  };

  const [loadingChange, setLoadingChange] = useState(false);

  const addToParty = index => {
    // setLoadingChange(true);
    let newParties = parties;
    newParties[index].items.push(props.pokeObject);
    firebase
      .database()
      .ref("users/" + props.userId + "/parties")
      .set(newParties);
    props.showToast(
      `${props.pokeObject.name} added to party: ${newParties[index].title}`
    );
    setNewParty("");
    props.close();
  };

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
    <Overlay
      isVisible={props.visible}
      onBackdropPress={() => {
        setNewParty("");
        props.close();
      }}
      overlayStyle={{ width: "80%", maxHeight: "60%" }}
    >
      <Text
        style={{
          color: "#2189DC",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10
        }}
      >
        Add to Party
      </Text>
      <ScrollView>
        {/* {loadingChange && <ActivityIndicator />} */}
        {parties.map((party, index) => (
          <TouchableOpacity onPress={() => addToParty(index)} key={index}>
            <ListItem title={party.title} bottomDivider topDivider></ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text
        style={{
          color: "#2189DC",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 10
        }}
      >
        Create New Party
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
            createParty(newParty);
            props.close();
          }}
          title="Create Party"
        />
      </View>
    </Overlay>
  );
};

export default Popover;

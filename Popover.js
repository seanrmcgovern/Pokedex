import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import axios from "axios";
import { ListItem, Overlay } from "react-native-elements";
import { Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const Popover = props => {
  const [parties, setParties] = useState([]);

  //   const addParty = name => {
  //     const newName = name === "" ? "New Party" : name;
  //     firebase
  //       .database()
  //       .ref("users/" + props.userId + "/parties")
  //       .set([...parties, { title: newName, items: [{ name: "head" }] }]);
  //   };

  const addToParty = index => {
    let newParties = parties;
    newParties[index].items.push(props.pokeObject);
    firebase
      .database()
      .ref("users/" + props.userId + "/parties")
      .set(newParties);
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
      onBackdropPress={props.close}
      overlayStyle={{ width: "80%" }}
    >
      <ScrollView>
        <Text
          style={{
            color: "#2189DC",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 10
          }}
        >
          Add to existing Party
        </Text>
        {parties.map((party, index) => (
          <TouchableOpacity onPress={() => addToParty(index)} key={index}>
            <ListItem title={party.title} bottomDivider topDivider></ListItem>
          </TouchableOpacity>
        ))}
        {/* <Text
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
        </View> */}
      </ScrollView>
    </Overlay>
  );
};

export default Popover;

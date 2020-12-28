import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import { ListItem, Overlay, Input, Button } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { screensEnabled } from "react-native-screens";

const Popover = props => {
  // add subscriber to refresh parties here too

  const [parties, setParties] = useState([]);
  const [newPartyName, setNewPartyName] = useState("");

  const createParty = () => {
    storeNewParty().then(() => {
      // refresh parties
      getParties();
      setNewPartyName("");
    });
  };

  const storeNewParty = async () => {
    try {
      await AsyncStorage.setItem("parties", JSON.stringify([...parties, {title: newPartyName, items: []}]));
      props.showToast(`Created party: "${newPartyName}"`);
    } catch (e) {
      console.log(e);
    }
  }

  const handlePartyChange = async (index) => {
    addToParty(index).then(() => {
      getParties();
      props.close();
    });
  }

  const addToParty = async (index) => {
    let newParties = parties;
    newParties[index].items.push(props.pokemon);
    try {
      await AsyncStorage.setItem("parties", JSON.stringify(newParties));
      props.showToast(`${props.pokemon.name} added to party: ${newParties[index].title}`);
    } catch (e) {
      console.log(e);
    }
  };

  const getParties = async () => {
    const parties = await AsyncStorage.getItem("parties");
    setParties(JSON.parse(parties));
  }

  useEffect(() => {
    getParties();
  }, []);

  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={() => {
        setNewPartyName("");
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
        {parties.map((party, index) => (
          <TouchableOpacity onPress={() => handlePartyChange(index)} key={index}>
            <ListItem
              title={party.title}
              bottomDivider
              topDivider
            ></ListItem>
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
        onChangeText={text => setNewPartyName(text)}
        value={newPartyName}
      />
      <View>
        <Button
          onPress={createParty}
          title={"Create Party"}
          disabled={newPartyName === ""}
          // disabled={newPartyName === "" || creatingParty}
        />
      </View>
    </Overlay>
  );
};

export default Popover;

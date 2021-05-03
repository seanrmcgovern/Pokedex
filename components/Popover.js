import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Overlay, Input, Button } from "react-native-elements";

const Popover = props => {
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
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is now focused
      // refresh parties
      getParties();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

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
      overlayStyle={{ width: "80%", maxHeight: "50%", flex: 1 }}
    >
      <View style={{flex: 1}}>
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
          {parties.length == 0 && 
            <ListItem
              title={"Create a party to choose from."}
              bottomDivider
              topDivider
            ></ListItem>}
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
          />
        </View>
      </View>
    </Overlay>
  );
};

export default Popover;

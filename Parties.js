import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Overlay, Input, ListItem } from "react-native-elements";
import { Root, Toast, Fab } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import PartyList from "./PartyList";

const styles = StyleSheet.create({
  buttonFab:{
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    backgroundColor: "#2189DC",
    borderRadius: 30,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.75
  },
});

const Parties = props => {

  const [overlayVisible, setOverlayVisible] = useState(false);

  const close = () => {
    setNewPartyName("");
    setOverlayVisible(!overlayVisible);
  };

  const showToast = text => {
    Toast.show({
      text: text,
      duration: 5000,
      type: "success"
    });
  };

  const [parties, setParties] = useState([]);

  const getParties = async () => {
    const parties = await AsyncStorage.getItem("parties");
    setParties(JSON.parse(parties));
  }

  const [newPartyName, setNewPartyName] = useState("");

  const createParty = () => {
    storeNewParty().then(() => { 
      getParties().then(() => {
        close();
        showToast(`Created party: "${newPartyName}"`);
      });
    });
  };

  const storeNewParty = async () => {
    await AsyncStorage.setItem("parties", JSON.stringify([...parties, {title: newPartyName, items: []}]));
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
    <Root>
      <View style={{backgroundColor: "#DE5C58", flex: 1}}>
        <ScrollView style={{ backgroundColor: "#DE5C58" }}>
          <View style={{ backgroundColor: "white" }}>
            {parties.length == 0 && 
              <ListItem
                title={"Create parties to plan teams for mainline games, nuzlocke runs, or competitive play!"}
                bottomDivider
                containerStyle={{ backgroundColor: "#F4F3F4" }}
              ></ListItem>}
            {parties.map((party, index) => (
              <PartyList
                navigation={props.navigation}
                title={party.title}
                party={party.items}
                partyIndex={index}
                parties={parties}
                refresh={getParties}
                showToast={showToast}
                key={index}
              ></PartyList>
            ))}
          </View>
        </ScrollView>
        <Overlay isVisible={overlayVisible} onBackdropPress={close} overlayStyle={{ width: "70%" }}>
          <Text style={{color: "#2189DC", fontSize: 16, fontWeight: "bold", marginBottom: 10}}>
            Enter Party Info
          </Text>
          <Input
            placeholder="Ex: New-Party-Name"
            label="Name"
            onChangeText={text => setNewPartyName(text)}
            value={newPartyName}
          />
          <View>
            <Button
              onPress={() => createParty()}
              title={"Create Party"}
              disabled={newPartyName === ""}
            />
          </View>
        </Overlay>
      </View>
      <TouchableOpacity style={styles.buttonFab} onPress={() => setOverlayVisible(!overlayVisible)}>
        <Icon name="plus" style={{color: "white"}} size={30}/>
      </TouchableOpacity>
    </Root>
  );
};

export default Parties;

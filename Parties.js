import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Overlay, Input } from "react-native-elements";
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
    borderRadius: 30
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
      <View style={{backgroundColor: "#DE5C58", flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ScrollView
          style={{ backgroundColor: "#DE5C58" }}
          contentContainerStyle={{ paddingBottom: 400 }}
        >
          <View style={{ backgroundColor: "white" }}>
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
        {/* <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={() => setOverlayVisible(!overlayVisible)}
            style={{ flex: 1, justifyContent: "flex-end", minHeight: 80 }}
          >
            <View
              style={{
                backgroundColor: "#2189DC",
                padding: 15,
                display: "flex",
                borderBottomWidth: 0.5,
                borderBottomColor: "#D3D3D3",
                alignItems: "center",
                marginBottom: 0
              }}
            >
              <Icon name="plus-square" size={40} color="white"></Icon>
            </View>
          </TouchableOpacity>
        </View> */}
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
        {/* <Fab
          style={{ backgroundColor: "#2189DC" }}
          position="bottomRight"
          onPress={() => setOverlayVisible(!overlayVisible)}
        >
          <TouchableOpacity onPress={() => setOverlayVisible(!overlayVisible)}>
            <Icon name="plus" style={{color: "white", }} size={30}/>
          </TouchableOpacity>
        </Fab> */}
      <TouchableOpacity style={styles.buttonFab} onPress={() => setOverlayVisible(!overlayVisible)}>
        <Icon name="plus" style={{color: "white", }} size={30}/>
      </TouchableOpacity>
    </Root>
  );
};

export default Parties;

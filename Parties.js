import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  NativeModules
} from "react-native";
import { Button, Overlay, Input } from "react-native-elements";
import { Root, Toast } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import PartyList from "./PartyList";

const Parties = props => {
  const [parties, setParties] = useState([]);

  const [newParty, setNewParty] = useState("");

  const [creatingParty, setCreatingParty] = useState(false);

  const createParty = () => {
    setCreatingParty(true);
  };

  const showToast = text => {
    Toast.show({
      text: text,
      duration: 5000,
      type: "success"
    });
  };

  // useEffect(() => {
  //   if (creatingParty) {
  //     firebase
  //       .database()
  //       .ref("users/" + props.userId + "/parties")
  //       .set([...parties, { title: newParty, items: [{ name: "head" }] }])
  //       .then(() => {
  //         setCreatingParty(false);
  //         setNewParty("");
  //         showToast(`Created party: "${newParty}"`);
  //         close();
  //       });
  //   }
  // }, [creatingParty]);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const close = () => {
    setNewParty("");
    toggleOverlay();
  };

  const [coreParties, setCoreParties] = useState([]);

  useEffect(() => {
    // pull parties from core data
    NativeModules.PartyBridge.getParties(parties => {
      console.log("parties sent to react: ", parties);
      // if (parties.length > 0) {
      // }
      setCoreParties(parties);
    });
    // firebase
    //   .database()
    //   .ref("users/" + props.userId)
    //   .on("value", snapshot => {
    //     const curParties = snapshot.val().parties;
    //     setParties(curParties);
    //   });
  }, []);

  return (
    <Root>
      <View
        style={{
          backgroundColor: "#DE5C58",
          flex: 1,
          flexDirection: "column"
        }}
      >
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
                userId={props.userId}
                parties={parties}
              ></PartyList>
            ))}
            {coreParties.map((party, index) => (
              <PartyList
                navigation={props.navigation}
                title={party.title}
                party={party.items}
                partyIndex={index}
                userId={props.userId}
                parties={coreParties}
              ></PartyList>
            ))}
          </View>
        </ScrollView>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={toggleOverlay}
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
        </View>
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
                createParty();
              }}
              title={creatingParty ? "" : "Create Party"}
              icon={
                creatingParty ? <ActivityIndicator color="#2189DC" /> : <></>
              }
              disabled={newParty === "" || creatingParty}
            />
          </View>
        </Overlay>
      </View>
    </Root>
  );
};

export default Parties;

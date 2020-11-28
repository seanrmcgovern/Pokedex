import React, { useEffect, useState, useRef } from "react";
import * as firebase from "firebase";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ListItem, Button, ButtonGroup } from "react-native-elements";
import {
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200}></Transition.In>
    <Transition.Change></Transition.Change>
    <Transition.Out type="fade" durationMs={200}></Transition.Out>
  </Transition.Together>
);

const PartyList = props => {
  const [open, setOpen] = useState(false);
  const height = open ? "auto" : 0;
  const ref = useRef();
  // const currentPartySize = props.party.length;

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [partyChange, setPartyChange] = useState();

  const deletePartyItem = index => {
    setPartyChange(index);
  };

  useEffect(() => {
    if (typeof partyChange === "number") {
      let newParty = props.party;
      newParty.splice(partyChange, 1);
      firebase
        .database()
        .ref(
          "users/" + props.userId + "/parties/" + props.partyIndex + "/items"
        )
        .set(newParty)
        .then(() => {
          setPartyChange();
        });
    }
  }, [partyChange]);

  const [deletionLoading, setDeletionLoading] = useState(false);

  const deleteParty = () => {
    setDeletionLoading(true);
  };

  useEffect(() => {
    if (deletionLoading) {
      let newParties = props.parties;
      newParties.splice(props.partyIndex, 1);
      firebase
        .database()
        .ref("users/" + props.userId + "/parties")
        .set(newParties)
        .then(() => {
          setDeletionLoading(false);
        });
    }
  }, [deletionLoading]);

  const [editActive, setEditActive] = useState(false);
  const handleButtonPress = index => {
    if (index === 1) {
      // edit button
      setEditActive(!editActive);
    } else {
      // delete button
      setEditActive(false);
      deleteParty();
    }
  };

  const button1 = () =>
    deletionLoading ? (
      <ActivityIndicator color="#DE5C58" />
    ) : (
      <Icon name="trash-o" size={20} color="#DE5C58" />
    );
  const button2 = () =>
    editActive ? (
      <Icon name="pencil-square" size={20} color="#2189DC" />
    ) : (
      <Icon name="pencil-square-o" size={20} color="#2189DC" />
    );
  const buttons = [{ element: button1 }, { element: button2 }];

  return (
    <View>
      <Transitioning.View transition={transition} ref={ref}>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpen(prev => !prev);
            setEditActive(false);
            // ref.current.animateNextTransition();
          }}
        >
          <View
            style={{
              backgroundColor: "#EDEBED",
              padding: 15,
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              borderBottomWidth: 0.5,
              borderBottomColor: "#D3D3D3"
            }}
          >
            <Text
              style={{
                fontSize: 16,
                flex: 1,
                alignItems: "flex-start"
              }}
            >
              {props.title}
            </Text>
            <View
              style={{
                alignItems: "flex-end",
                flex: 1
              }}
            >
              {open ? (
                <Icon name="chevron-down" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="chevron-right" size={20} color="#2189DC"></Icon>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            height: height,
            overflow: "hidden"
          }}
        >
          {props.party.map(
            (item, index) =>
              // index > 0 && (
               (
                <ListItem
                  onPress={() =>
                    props.navigation.navigate("Details", {
                      name: capitalize(item.name),
                      pokemon: item.pokemon,
                      image: item.image,
                      id: item.id,
                      gen: item.gen,
                      shiny: item.shiny,
                      userId: props.userId
                    })
                  }
                  title={item.name}
                  leftAvatar={{
                    source: {
                      uri: item.image
                    }
                  }}
                  bottomDivider
                  containerStyle={{ backgroundColor: "#F4F3F4" }}
                  rightIcon={
                    editActive ? (
                      <Button
                        onPress={() => deletePartyItem(index)}
                        buttonStyle={{
                          backgroundColor: "white",
                          borderColor: "#DE5C58",
                          borderWidth: 1
                        }}
                        icon={
                          partyChange != index ? (
                            <Icon
                              name="trash-o"
                              size={20}
                              color="#DE5C58"
                            ></Icon>
                          ) : (
                            <ActivityIndicator color="#DE5C58" />
                          )
                        }
                      ></Button>
                    ) : (
                      ""
                    )
                  }
                ></ListItem>
              )
          )}
          <ButtonGroup
            onPress={handleButtonPress}
            // selectedButtonStyle={{ backgroundColor: "#F4F3F4" }}
            // selectedIndex={selectedButton}
            buttons={buttons}
            containerStyle={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              backgroundColor: "#F4F3F4"
            }}
          />
        </View>
      </Transitioning.View>
    </View>
  );
};

export default PartyList;

import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import { ListItem, Button } from "react-native-elements";
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
  const currentPartySize = props.party.length;

  return (
    <View>
      <Transitioning.View
        transition={transition}
        ref={ref}
        style={{ backgroundColor: "white" }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setOpen(prev => !prev);
            ref.current.animateNextTransition();
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
        <View style={{ height: height, overflow: "hidden" }}>
          {props.party.map(
            (item, index) =>
              index > 0 && (
                <ListItem
                  title={item.name}
                  leftAvatar={{
                    source: {
                      uri: item.image
                    }
                  }}
                  bottomDivider
                  containerStyle={{ backgroundColor: "#F4F3F4" }}
                ></ListItem>
              )
          )}
          {currentPartySize < 6 && (
            <TouchableOpacity>
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
                <Icon name="pencil-square" size={20} color="white"></Icon>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Transitioning.View>
    </View>
  );
};

export default PartyList;

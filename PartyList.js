import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Button, ListItem, Divider } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
//import { Transition, Transitioning } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "white"
  }
});

const PartyList = props => {
  const [open, setOpen] = useState(false);
  const bottomRadius = open ? 0 : 8;
  const height = open ? "auto" : 0;

  return (
    <View style={{ backgroundColor: "white", height: 50 }}>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <View
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: bottomRadius,
            borderBottomRightRadius: bottomRadius,
            backgroundColor: "white",
            padding: 15,
            display: "flex",
            //flex: 1,
            flexDirection: "row",
            flexGrow: 1
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
          <View style={{ alignItems: "flex-end", flex: 1 }}>
            <Icon name="chevron-right" size={20}></Icon>
          </View>
        </View>
        <View style={{ height: height }}>
          {props.party &&
            props.party.map(pokemon => {
              <ListItem title={pokemon.name}></ListItem>;
            })}
          <ListItem title="Skip"></ListItem>
          <ListItem title="Cacturne"></ListItem>
          <ListItem title="Flygon"></ListItem>
          <ListItem title="Xatu"></ListItem>
          <ListItem title="Cradily"></ListItem>
          <ListItem title="Golem"></ListItem>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PartyList;

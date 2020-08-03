import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Image
} from "react-native";
import PokeballSprite from "./assets/pokeballSprite.png";
import { Button, ListItem, Divider } from "react-native-elements";
import PartyList from "./PartyList";

const styles = StyleSheet.create({});

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

const Tab2 = props => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp"
  });

  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: "clamp"
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5
    ],
    extrapolate: "clamp"
  });

  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
    outputRange: [0, 0, 1000],
    extrapolate: "clamp"
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26
    ],
    outputRange: [-20, -20, -20, 0],
    extrapolate: "clamp"
  });

  const subHeaderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 150],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });

  // const choosePhoto = () => {
  //   CameraRoll.getPhotos({ first: 1 });
  // };

  const [parties, setParties] = useState([]);

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
    <View style={{ flex: 1, backgroundColor: "#DE5C58" }}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#2189DC",
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex,
          alignItems: "center"
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            opacity: subHeaderOpacity,
            bottom: headerTitleBottom
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold"
            }}
          >
            {props.username}
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{ flex: 1, zIndex: 1, elevation: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <Animated.View
          style={{
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderColor: "white",
            borderWidth: 3,
            overflow: "hidden",
            marginTop: profileImageMarginTop,
            marginLeft: 10
            // backgroundColor: "#DE5C58"
          }}
        >
          <Image
            source={PokeballSprite}
            style={{ flex: 1, width: null, height: null }}
          />
        </Animated.View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 26,
              paddingLeft: 10,
              color: "white"
            }}
          >
            {props.username}
          </Text>
        </View>
        {/* <Divider
          style={{ backgroundColor: "#2189DC", height: 5, marginBottom: 10 }}
        ></Divider> */}
        <View style={{ height: 1000, backgroundColor: "#DE5C58" }}>
          {/* <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              fontWeight: "bold",
              color: "white"
            }}
          >
            Parties
          </Text> */}
          <ListItem title={"Parties"} bottomDivider></ListItem>
          {parties.map(party => (
            // <ListItem title={party.title}></ListItem>
            <PartyList title={party.title} party={party.items}></PartyList>
          ))}
          {/* <Button
            onPress={() => {
              console.log(parties);
            }}
            title="Choose Photo"
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Tab2;

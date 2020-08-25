import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Overlay, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Favorites = props => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // firebase
    //   .database()
    //   .ref("users/" + props.userId)
    //   .on("value", snapshot => {
    //     const curParties = snapshot.val().parties;
    //     setParties(curParties);
    //   });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, zIndex: 1, elevation: 1 }}
      scrollEventThrottle={16}
    >
      <View style={{ height: 1000, backgroundColor: "#DE5C58" }}></View>
    </ScrollView>
  );
};

export default Favorites;

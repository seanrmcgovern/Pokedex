import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemList from "../ItemList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const BerryView = () => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const range = (start, end) =>
    Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);

  // add asyncstorage
  const getBerries = async () => {
    // items/ 126 - 189
    const berryIds = range(126, 189);
    const berries = await fetchBerries(berryIds);
    console.log({ berries });
    setBerries(berries);
  };

  const fetchBerries = (list) => {
    return Promise.all(
      list.map(async (id) => {
        let res = await axios.get("https://pokeapi.co/api/v2/item/" + id);
        return {
          name: capitalize(
            res.data.name.substring(0, res.data.name.indexOf("-"))
          ),
          category: capitalize(res.data.category.name.replace("-", " ")),
          effect: res.data.effect_entries[0].effect.replace(
            /(\r\n|\n|\r|\f)/gm,
            " "
          ),
          sprite: res.data.sprites.default,
          firstHeader: "Category",
          secondHeader: "Effect",
          suffix: "Berry",
        };
      })
    );
  };

  const [berries, setBerries] = useState([]);

  useEffect(() => {
    getBerries();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerBackTitleStyle: {
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#2189DC",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* <Stack.Screen name="Berries" component={Berries} /> */}
      <Stack.Screen name="TMs">
        {(props) => <ItemList {...props} items={berries} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default BerryView;

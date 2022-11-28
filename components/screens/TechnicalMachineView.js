import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemList from "../ItemList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uniqBy, orderBy } from "lodash";
import { tmIds } from "../../data/apiUtilities";

const Stack = createStackNavigator();

const TechnicalMachineView = () => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchTechincalMachines = () => {
    return Promise.all(
      tmIds.map(async (id) => {
        let res = await axios.get("https://pokeapi.co/api/v2/machine/" + id);
        // const itemUrl = res.data.item.url;
        const moveUrl = res.data.move.url;
        // const itemRes = await axios.get(itemUrl);
        const moveRes = await axios.get(moveUrl);
        const move = moveRes.data.name;
        const type = moveRes.data.type.name;
        const damageClass = moveRes.data.damage_class.name;
        const effectObj = moveRes.data.effect_entries.find(
          (x) => x.language.name === "en"
        );
        return {
          id: res.data.id,
          name: capitalize(move.replace("-", " ")),
          effect: effectObj?.effect.replace(/(\r\n|\n|\r|\f)/gm, " "),
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${type}.png`,
          category: capitalize(damageClass),
          suffix: "",
          firstHeader: "Damage Class",
          secondHeader: "Effect",
        };
      })
    );
  };

  const getMachines = async () => {
    try {
      const asyncStorageMachines = await AsyncStorage.getItem(
        "technicalMachines"
      );
      const parsedTechnicalMachines = uniqBy(
        orderBy(JSON.parse(asyncStorageMachines), ["name"], ["asc"]),
        "name"
      );
      if (parsedTechnicalMachines.length === 0) {
        const apiListRes = await fetchTechincalMachines();
        const machinesToSave = uniqBy(
          orderBy(apiListRes, ["name"], ["asc"]),
          "name"
        );
        await AsyncStorage.setItem(
          "technicalMachines",
          JSON.stringify(machinesToSave)
        );
        setMachines(parsedTechnicalMachines);
      } else {
        setMachines(parsedTechnicalMachines);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [machines, setMachines] = useState([]);

  useEffect(() => {
    getMachines();
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
      <Stack.Screen name="TMs">
        {(props) => <ItemList {...props} items={machines} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default TechnicalMachineView;

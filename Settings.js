import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, NativeModules, StyleSheet } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Settings = ({ navigation, route, userId }) => {
  // Create User Defaults to know which generations are saved
  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // gen 6 special case with pokedex separation in pokeapi
  const downloadKalos = () => {
    setSaved([...saved, 6]);
    for (let p = 12; p < 15; p++) {
      axios.get("https://pokeapi.co/api/v2/pokedex/" + p + "/").then(res => {
        for (let j = 0; j < res.data.pokemon_entries.length; j++) {
          const entry = res.data.pokemon_entries[j];
          const entryId = parseInt(entry.pokemon_species.url.slice(42, -1));
          if (entryId > 649) {
            let height = 0;
            let weight = 0;
            let flavor = "";
            let catchRate = 0;
            let friendship = 0;
            const pokeUrl =
              entry.pokemon_species.url.slice(0, 33) +
              entry.pokemon_species.url.slice(41);
            axios.get(pokeUrl).then(res2 => {
              height = res2.data.height;
              weight = res2.data.weight;
              axios
                .get("https://pokeapi.co/api/v2/pokemon-species/" + entryId)
                .then(res3 => {
                  let englishText = res3.data.flavor_text_entries[6];
                  flavor = englishText.flavor_text.replace(
                    /(\r\n|\n|\r)/gm,
                    " "
                  );
                  catchRate = res3.data.capture_rate;
                  friendship = res3.data.base_happiness;
                  // save cards with native bridge one at a time
                  NativeModules.PokeCardBridge.savePokeCard(
                    entryId,
                    12,
                    capitalize(entry.pokemon_species.name),
                    height,
                    weight,
                    catchRate,
                    friendship,
                    flavor
                  );
                });
            });
          }
        }
      });
    }
    refreshDownloads();
  };

  const downloadGen = (gen, entryLimit, flavorTextId, actualGen) => {
    setSaved([...saved, actualGen]);
    axios.get("https://pokeapi.co/api/v2/pokedex/" + gen + "/").then(res => {
      for (let j = 0; j < res.data.pokemon_entries.length; j++) {
        const entry = res.data.pokemon_entries[j];
        const entryId = parseInt(entry.pokemon_species.url.slice(42, -1));
        if (entryId > entryLimit) {
          let height = 0;
          let weight = 0;
          let flavor = "";
          let catchRate = 0;
          let friendship = 0;
          let imageUrl = "";
          const pokeUrl =
            entry.pokemon_species.url.slice(0, 33) +
            entry.pokemon_species.url.slice(41);
          axios.get(pokeUrl).then(res2 => {
            height = res2.data.height;
            weight = res2.data.weight;
            // imageUrl = res2.data.sprites.front_default;
            // setImageUrl(res.data.sprites.front_default);
            // setShiny(res.data.sprites.front_shiny);
            axios
              .get("https://pokeapi.co/api/v2/pokemon-species/" + entryId)
              .then(res3 => {
                let englishText = res3.data.flavor_text_entries[flavorTextId];
                flavor = englishText.flavor_text.replace(/(\r\n|\n|\r)/gm, " ");
                catchRate = res3.data.capture_rate;
                friendship = res3.data.base_happiness;
                // save cards with native bridge one at a time
                NativeModules.PokeCardBridge.savePokeCard(
                  entryId,
                  gen,
                  capitalize(entry.pokemon_species.name),
                  height,
                  weight,
                  catchRate,
                  friendship,
                  flavor
                );
              });
          });
        }
      }
    });
    refreshDownloads();
  };

  const [kanto, setKanto] = useState();
  const [johto, setJohto] = useState();
  const [hoenn, setHoenn] = useState();
  const [sinnoh, setSinnoh] = useState();
  const [unova, setUnova] = useState();
  const [kalos, setKalos] = useState();
  const [alola, setAlola] = useState();
  const [saved, setSaved] = useState([]);

  const refreshDownloads = () => {
    NativeModules.PokeCardBridge.isKantoSaved(val => {
      setKanto(val);
    });
    NativeModules.PokeCardBridge.isJohtoSaved(val => {
      setJohto(val);
    });
    NativeModules.PokeCardBridge.isHoennSaved(val => {
      setHoenn(val);
    });
    NativeModules.PokeCardBridge.isSinnohSaved(val => {
      setSinnoh(val);
    });
    NativeModules.PokeCardBridge.isUnovaSaved(val => {
      setUnova(val);
    });
    NativeModules.PokeCardBridge.isKalosSaved(val => {
      setKalos(val);
    });
    NativeModules.PokeCardBridge.isAlolaSaved(val => {
      setAlola(val);
    });
  };

  useEffect(() => {
    refreshDownloads();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#DE5C58"
      }}
    >
      <ListItem
        title={"Save Generation 1"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(1) || kanto}
            onPress={() =>
              downloadGen(
                /*gen*/ 2,
                /*entryLimit*/ 0,
                /*flavorTextId*/ 44,
                /*actualGen*/ 1
              )
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(1) && !kanto ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }
      ></ListItem>
      <ListItem
        title={"Save Generation 2"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(2) || johto}
            onPress={() =>
              downloadGen(
                /*gen*/ 3,
                /*entryLimit*/ 151,
                /*flavorTextId*/ 41,
                /*actualGen*/ 2
              )
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(2) && !johto ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }
      ></ListItem>
      <ListItem
        title={"Save Generation 3"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(3) || hoenn}
            onPress={() =>
              downloadGen(
                /*gen*/ 4,
                /*entryLimit*/ 251,
                /*flavorTextId*/ 46,
                /*actualGen*/ 3
              )
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(3) && !hoenn ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }
      ></ListItem>
      <ListItem
        title={"Save Generation 4"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(4) || sinnoh}
            onPress={() =>
              downloadGen(
                /*gen*/ 5,
                /*entryLimit*/ 386,
                /*flavorTextId*/ 2,
                /*actualGen*/ 4
              )
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(4) && !sinnoh ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }
      ></ListItem>
      <ListItem
        title={"Save Generation 5"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(5) || unova}
            onPress={() =>
              downloadGen(
                /*gen*/ 8,
                /*entryLimit*/ 494,
                /*flavorTextId*/ 28,
                /*actualGen*/ 5
              )
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(5) && !unova ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }
      ></ListItem>
      <ListItem
        title={"Save Generation 6"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(6) || kalos}
            onPress={() => downloadKalos()}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(6) && !kalos ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }
      ></ListItem>
      <ListItem
        title={"Save Generation 7"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(7) || alola}
            onPress={() =>
              downloadGen(
                /*gen*/ 16,
                /*entryLimit*/ 721,
                /*flavorTextId*/ 7,
                /*actualGen*/ 7
              )
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(7) && !alola ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }
      ></ListItem>
    </View>
  );
};

export default Settings;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  NativeModules,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Text, Card, CardItem, Body } from "native-base";
import { ListItem, Button, ButtonGroup } from "react-native-elements";
import Pokeball from "./assets/pokeball.png";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  buffer: {
    height: 30,
    backgroundColor: "#DE5C58"
  },
  header: {
    alignItems: "center",
    padding: 0,
    margin: 0,
    backgroundColor: "#3F4448",
    backgroundColor: "#DE5C58"
  },
  headerIcon: {
    paddingRight: 10
  },
  title: {
    fontFamily: "Verdana-Bold",
    fontSize: 30,
    color: "white"
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center"
  }
});

const Settings = ({ navigation, route, userId }) => {
  // Create User Defaults to know which generations are saved
  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // make unique function for gen 7

  // change to entry range? in order to lose top axios call
  const downloadGen = (gen, entryLimit, flavorTextId, actualGen) => {
    // add gen to user defaults saved/downloaded list
    setSaved([...saved, actualGen]);
    let cardList = [];
    axios.get("https://pokeapi.co/api/v2/pokedex/" + gen + "/").then(res => {
      for (let j = 0; j < res.data.pokemon_entries.length; j++) {
        const entry = res.data.pokemon_entries[j];
        const entryId = parseInt(entry.pokemon_species.url.slice(42, -1));
        if (entryId > entryLimit) {
          // let types = []
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
            // for (let k = 0; k < res2.data.types.length; k++) {
            //     types.push(res.data.stats)
            // }
            // setImageUrl(res.data.sprites.front_default);
            // setShiny(res.data.sprites.front_shiny);
            axios
              .get("https://pokeapi.co/api/v2/pokemon-species/" + entryId)
              .then(res3 => {
                let englishText = res3.data.flavor_text_entries[flavorTextId];
                flavor = englishText.flavor_text.replace(/(\r\n|\n|\r)/gm, " ");
                catchRate = res3.data.capture_rate;
                friendship = res3.data.base_happiness;
                cardList.push({
                  id: entryId,
                  generation: actualGen,
                  name: capitalize(entry.pokemon_species.name),
                  height: height,
                  weight: weight,
                  flavor: flavor,
                  catchRate: catchRate,
                  friendship: friendship
                });
                // console.log("cardlist now: ", cardList);
                // save cards with native bridge one at a time
                NativeModules.UserInfo.savePokeCard(
                  entryId,
                  actualGen,
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
    // call native function, passing the pokeList, to save all PokeCards here
    // NativeModules.UserInfo.savePokeCards(cardList);
    refreshDownloads();
  };

  const getCards = () => {
    NativeModules.UserInfo.getPokeCards();
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
    NativeModules.UserInfo.isKantoSaved(val => {
      setKanto(val);
    });
    NativeModules.UserInfo.isJohtoSaved(val => {
      setJohto(val);
    });
    NativeModules.UserInfo.isHoennSaved(val => {
      setHoenn(val);
    });
    NativeModules.UserInfo.isSinnohSaved(val => {
      setSinnoh(val);
    });
    NativeModules.UserInfo.isUnovaSaved(val => {
      setUnova(val);
    });
    // NativeModules.UserInfo.isKalosSaved((val) => {
    //     setKalos(val);
    // });
    NativeModules.UserInfo.isAlolaSaved(val => {
      setAlola(val);
    });
  };
  // add useEffect on mount to pull the user defaults of downloaded/saved generations of pokecards
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
            // onPress={() => getCards()}
            onPress={() => downloadGen(2, 0, 44, 1)}
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
            // onPress={() => getCards()}
            onPress={() => downloadGen(3, 151, 41, 2)}
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
            onPress={() => downloadGen(4, 251, 46, 3)}
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
            onPress={() => downloadGen(5, 386, 2, 4)}
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
            onPress={() => downloadGen(8, 494, 28, 5)}
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
      {/* <ListItem
        title={"Save Generation 6"}
        bottomDivider
        rightIcon={
          <Button
            onPress={() => downloadGen(8, 494, 6, 6)}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              savingToCore != 1 ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <ActivityIndicator color="#2189DC" />
              )
            }
          ></Button>
        }
      ></ListItem> */}
      <ListItem
        title={"Save Generation 7"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(7) || alola}
            onPress={() => downloadGen(16, 721, 7, 7)}
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

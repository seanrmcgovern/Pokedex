import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, NativeModules } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Settings = ({ navigation, route, userId }) => {
  // Create User Defaults to know which generations are saved
  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const convertToBase64 = (url) => {
    NativeModules.CsvDataManager.convertToBase64(url);
  }

  const saveJSON = () => {
    NativeModules.CsvDataManager.saveToJSON();
  }

  // save each form as a pokecard, with id that matches the original id of the main pokemon form
  // pull those from core data, sort by id, then create new json with all data plus varieties
  // 0 - 899 exclusive
  const saveForms = () => {
    // const forms = []; // array of dictionaries
    // for (let i = 800; i < 899; i++) {
    //   axios.get("https://pokeapi.co/api/v2/pokemon-species/" + i).then(res => {
    //     const data = res.data;
    //     const id = res.data.id;
    //     const flavor = data.form_descriptions.length > 0 ? data.form_descriptions[0].description : "";
    //     const varieties = data.varieties.slice(1);
    //     for (const item of varieties) {
    //       const name = item.pokemon.name;
    //       let types = [];
    //       let stats = [];
    //       let height = 0;
    //       let weight = 0;
    //       let abilities = [];
    //       let image;
    //       // console.log("url: ", item.pokemon.url);
    //       axios.get(item.pokemon.url).then(itemRes => {
    //         image = itemRes.data.sprites.front_default;
    //         for (let t = 0; t < itemRes.data.types.length; t++) {
    //           types.push(itemRes.data.types[t].type.name);
    //         }
    //         for (let s = 0; s < itemRes.data.stats.length; s++) {
    //           stats.push(itemRes.data.stats[s].base_stat);
    //         }
    //         height = itemRes.data.height;
    //         weight = itemRes.data.weight;
    //         const abilityObjects = itemRes.data.abilities;
    //         for (const a of abilityObjects) {
    //           const abilityName = a.ability.name;
    //           axios.get(a.ability.url).then(abilityRes => {
    //             const englishEffect = abilityRes.data.effect_entries.find(
    //               e => e.language.name === "en"
    //             );
    //             abilities.push({
    //               name: abilityName,
    //               effect: englishEffect ? englishEffect.effect : ""
    //             });
    //           })
    //         }
    //       }).then(() => NativeModules.PokeCardBridge.savePokeCard(
    //         id,
    //         0, 
    //         capitalize(name),
    //         height,
    //         weight,
    //         0,
    //         0,
    //         flavor,
    //         image,
    //         "",
    //         types,
    //         stats,
    //         abilities
    //       ))
    //     }
    //   })
    // }
    NativeModules.CsvDataManager.saveForms();
  }

  const downloadGeneration = (g) => {
    setSaved([...saved, g]);
      const url = "https://pokeapi.co/api/v2/generation/" + g + "/";
      axios.get(url).then(res => {
          const pokemon = res.data.pokemon_species;
          for (const item of pokemon) {
            console.log({item});
            const id = parseInt(item.url.slice(42, -1));
            const name = item.name;
            let height = 0;
            let weight = 0;
            let flavor = "";
            let catchRate = 0;
            let friendship = 0;
            let imageUrl = "";
            let shinyUrl = "";
            let types = [];
            let stats = [];
            const detailsUrl = item.url.slice(0, 33) + item.url.slice(41); // "/pokemon" endpoint
            axios.get(detailsUrl).then(res2 => {
              height = res2.data.height;
              weight = res2.data.weight;
              imageUrl = res2.data.sprites.front_default;
              shinyUrl = res2.data.sprites.front_shiny;
              for (let t = 0; t < res2.data.types.length; t++) {
                types.push(res2.data.types[t].type.name);
              }
              for (let s = 0; s < res2.data.stats.length; s++) {
                stats.push(res2.data.stats[s].base_stat);
              }
              let abilities = [];
              for (let i = 0; i < res2.data.abilities.length; i++) {
                axios
                  .get(res2.data.abilities[i].ability.url)
                  .then(abilityRes => {
                    const englishEffect = abilityRes.data.effect_entries.find(
                      e => e.language.name === "en"
                    );
                    abilities.push({
                      name: res2.data.abilities[i].ability.name,
                      effect: englishEffect ? englishEffect.effect : ""
                    });
                  });
              }
              axios
                .get(item.url) // pokemon-species endpoint
                .then(res3 => {
                  let englishText = "";
                  if (g === 1) {
                    englishText = res3.data.flavor_text_entries[44];
                  }  else {
                    englishText = res3.data.flavor_text_entries.find(
                      e => e.language.name === "en"
                    );
                  }
                  flavor = englishText.flavor_text.replace(/(\r\n|\n|\r)/gm, " ");
                  catchRate = res3.data.capture_rate;
                  friendship = res3.data.base_happiness;
                  // save cards with native bridge one at a time
                  // push card to card list here
                  NativeModules.PokeCardBridge.savePokeCard(
                    id,
                    g, // generation
                    capitalize(name),
                    height,
                    weight,
                    catchRate,
                    friendship,
                    flavor,
                    imageUrl,
                    shinyUrl,
                    types,
                    stats,
                    abilities
                  );
                });
            });
          }
      });
      refreshDownloads();
  }

  const downloadGen = (gen, entryLimit, flavorTextId) => {
    setSaved([...saved, gen]);
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
          let types = [];
          let stats = [];
          const pokeUrl =
            entry.pokemon_species.url.slice(0, 33) +
            entry.pokemon_species.url.slice(41);
          axios.get(pokeUrl).then(res2 => {
            height = res2.data.height;
            weight = res2.data.weight;
            imageUrl = res2.data.sprites.front_default;
            for (let t = 0; t < res2.data.types.length; t++) {
              types.push(res2.data.types[t].type.name);
            }
            for (let s = 0; s < res2.data.stats.length; s++) {
              stats.push(res2.data.stats[s].base_stat);
            }
            // setShiny(res.data.sprites.front_shiny);
            axios
              .get("https://pokeapi.co/api/v2/pokemon-species/" + entryId)
              .then(res3 => {
                let englishText = res3.data.flavor_text_entries[flavorTextId];
                // flavor = englishText.flavor_text.replace(/(\r\n|\n|\r)/gm, " ");
                flavor = englishText.flavor_text.replace(/(\r\n|\n|\r|\f)/gm, " ");
                catchRate = res3.data.capture_rate;
                friendship = res3.data.base_happiness;
                // save cards with native bridge one at a time
                // push card to card list here
                NativeModules.PokeCardBridge.savePokeCard(
                  entryId,
                  gen,
                  capitalize(entry.pokemon_species.name),
                  height,
                  weight,
                  catchRate,
                  friendship,
                  flavor,
                  imageUrl,
                  types,
                  stats
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
  const [galar, setGalar] = useState();
  const [saved, setSaved] = useState([]);

  const allSaved = kanto && johto && hoenn && sinnoh && unova && kalos && alola && galar;

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
    NativeModules.PokeCardBridge.isGalarSaved(val => {
      setGalar(val);
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
      <ListItem title={"Download Image"} 
        rightIcon={
          <Button
            onPress={() =>
              convertToBase64("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/618-galar.png")
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={<Icon name="download" size={20} color="#2189DC"></Icon>}
          ></Button>
        }></ListItem>
      <ListItem title={"Download JSON"} 
        rightIcon={
          <Button
            onPress={() =>
              console.log("downloading")
              // saveJSON()
              // saveForms()
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={<Icon name="download" size={20} color="#2189DC"></Icon>}
          ></Button>
        }></ListItem>
      {/* <ListItem title={"Download All Pokemon"} 
        rightIcon={
          <Button
            disabled={allSaved}
            onPress={() =>
              downloadGenerations()
            }
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !allSaved ? (
                <Icon name="download" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="check" size={20} color="#2189DC"></Icon>
              )
            }
          ></Button>
        }></ListItem> */}
      <ListItem
        title={"Save Generation 1"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(1) || kanto}
            // onPress={() =>
            //   downloadGen(
            //     /*gen*/ 1,
            //     /*entryLimit*/ 0,
            //     /*flavorTextId*/ 44,
            //     /*actualGen*/ 1
            //   )
            // }
            onPress={() =>downloadGeneration(/*gen*/ 1,)}
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
            // onPress={() =>
            //   downloadGen(
            //     /*gen*/ 2,
            //     /*entryLimit*/ 151,
            //     /*flavorTextId*/ 41,
            //     /*actualGen*/ 2
            //   )
            // }
            onPress={() =>downloadGeneration(/*gen*/ 2,)}
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
            // onPress={() =>
            //   downloadGen(
            //     /*gen*/ 3,
            //     /*entryLimit*/ 251,
            //     /*flavorTextId*/ 46,
            //     /*actualGen*/ 3
            //   )
            // }
            onPress={() =>downloadGeneration(/*gen*/ 3,)}
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
            // onPress={() =>
            //   downloadGen(
            //     /*gen*/ 4,
            //     /*entryLimit*/ 386,
            //     /*flavorTextId*/ 2,
            //     /*actualGen*/ 4
            //   )
            // }
            onPress={() =>downloadGeneration(/*gen*/ 4,)}
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
            // onPress={() =>
            //   downloadGen(
            //     /*gen*/ 5,
            //     /*entryLimit*/ 494,
            //     /*flavorTextId*/ 28,
            //     /*actualGen*/ 5
            //   )
            // }
            onPress={() =>downloadGeneration(/*gen*/ 5,)}
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
            // onPress={() => downloadGen(6)}
            onPress={() =>downloadGeneration(/*gen*/ 6,)}
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
            // onPress={() =>
            //   downloadGen(
            //     /*gen*/ 7,
            //     /*entryLimit*/ 721,
            //     /*flavorTextId*/ 7,
            //     /*actualGen*/ 7
            //   )
            // }
            onPress={() =>downloadGeneration(/*gen*/ 7,)}
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
      <ListItem
        title={"Save Generation 8"}
        bottomDivider
        rightIcon={
          <Button
            disabled={saved.includes(8) || galar}
            // onPress={() =>
            //   downloadGen(
            //     /*gen*/ 7,
            //     /*entryLimit*/ 721,
            //     /*flavorTextId*/ 7,
            //     /*actualGen*/ 7
            //   )
            // }
            onPress={() =>downloadGeneration(/*gen*/ 8,)}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: "#2189DC",
              borderWidth: 1
            }}
            icon={
              !saved.includes(8) && !galar ? (
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import Pokeball from "./assets/pokeball.png";
import PokeballSprite from "./assets/pokeballSprite.png";
import Stats from "./Stats";

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
  title: {
    // fontFamily: "PingFangHK-Semibold"
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

const MegaDetails = props => {
  const { name } = props.route.params;
  let { pokemon } = props.route.params;
  const { image } = props.route.params;
  const { id } = props.route.params;
  const { flavor } = props.route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [abilityLoading, setAbilityLoading] = useState(true);

  //const [pokemon, setPokemon] = useState();
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTypeColor = type => {
    switch (type) {
      case "grass":
        return "green";
        break;
      case "poison":
        return "purple";
        break;
      case "water":
        return "#2189DC";
        break;
      case "fire":
        return "orange";
        break;
      case "rock":
        return "#AC7901";
        break;
      case "flying":
        return "#C8B9CE";
        break;
      case "fairy":
        return "violet";
        break;
      case "psychic":
        return "#C94AEE";
        break;
      case "ground":
        return "#7F6526";
        break;
      case "bug":
        return "#BBEF57";
        break;
      case "normal":
        return "tan";
        break;
      case "fighting":
        return "brown";
        break;
      case "dark":
        return "#3F4448";
        break;
      case "steel":
        return "grey";
        break;
      case "ice":
        return "#91E9EA";
        break;
      case "dragon":
        return "#35328D";
        break;
      case "ghost":
        return "#936BA4";
        break;
      case "electric":
        return "#F6D812";
        break;
    }
  };

  useEffect(() => {
    let abilitiesToAdd = [];
    for (let i = 0; i < pokemon.abilities.length; i++) {
      axios
        .get(pokemon.abilities[i].ability.url)
        .then(res => {
          const englishEffect = res.data.effect_entries.find(
            e => e.language.name === "en"
          );
          abilitiesToAdd.push({
            name: pokemon.abilities[i].ability.name,
            effect: englishEffect.effect
          });
        })
        .then(() => {
          if (abilitiesToAdd.length === pokemon.abilities.length) {
            setAbilities(abilitiesToAdd);
            setAbilityLoading(false);
          }
        });
    }
    setTypes(pokemon.types);
  }, [pokemon]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(res => {
        pokemon = res.data;
      })
      .then(res => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <ScrollView style={{ backgroundColor: "#DE5C58" }}>
      {(isLoading || abilityLoading) && (
        <View style={{ height: "100%" }}>
          <View
            style={{
              flex: 1,
              marginTop: 300
            }}
          >
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      )}
      {!isLoading && !abilityLoading && (
        <View>
          <View style={styles.header}>
            <ImageBackground source={Pokeball} style={styles.image}>
              <Image
                resizeMode="cover"
                source={
                  image
                    ? {
                        uri: image
                      }
                    : PokeballSprite
                }
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                  padding: 0
                }}
              />
            </ImageBackground>
          </View>
          <View>
            <ListItem
              contentContainerStyle={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
              containerStyle={{
                backgroundColor: "#DE5C58",
                borderWidth: 5,
                borderColor: "#DE5C58",
                borderTopColor: "#2189DC",
                borderBottomColor: "#2189DC"
              }}
              subtitle={flavor}
              subtitleStyle={{
                color: "white",
                fontSize: 15
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 5,
              borderBottomWidth: 5,
              borderBottomColor: "#2189DC"
            }}
          >
            {types.map((item, index) => (
              <ListItem
                key={index}
                title={"Type " + (index + 1).toString()}
                contentContainerStyle={{
                  display: "flex"
                }}
                titleStyle={{
                  alignSelf: "flex-start"
                }}
                badge={{
                  value: item.type.name,
                  textStyle: { color: "white", fontSize: 12 },
                  badgeStyle: {
                    backgroundColor: getTypeColor(item.type.name),
                    minWidth: 75
                  }
                }}
                bottomDivider
              ></ListItem>
            ))}
            <ListItem
              title={"Height"}
              rightTitle={pokemon.height}
              bottomDivider
            ></ListItem>
            <ListItem
              title={"Weight"}
              rightTitle={pokemon.weight}
              bottomDivider
            ></ListItem>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                fontWeight: "bold",
                color: "white"
              }}
            >
              Base Stats
            </Text>
            <Stats
              hp={pokemon.stats[0].base_stat}
              attack={pokemon.stats[1].base_stat}
              defense={pokemon.stats[2].base_stat}
              specialAttack={pokemon.stats[3].base_stat}
              specialDefense={pokemon.stats[4].base_stat}
              speed={pokemon.stats[5].base_stat}
            ></Stats>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                fontWeight: "bold",
                color: "white"
              }}
            >
              Abilities
            </Text>
            <View>
              {abilities.map((a, index) => (
                <ListItem
                  title={capitalize(a.name)}
                  titleStyle={{ color: "#2189DC" }}
                  subtitle={a.effect}
                  bottomDivider
                  key={index}
                ></ListItem>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default MegaDetails;

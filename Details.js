import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
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

const Details = ({ navigation, route }) => {
  const { name } = route.params;
  const { pokemon } = route.params;
  const { image } = route.params;
  const { id } = route.params;
  const { gen } = route.params;
  const { shiny } = route.params;

  const [isShiny, setIsShiny] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            setIsShiny(isShiny => !isShiny);
          }}
          title=""
          icon={<Icon name="star-o" size={15} color="white" />}
        />
      )
    });
  }, [navigation]);

  const [isLoading, setIsLoading] = useState(true);
  const [abilityLoading, setAbilityLoading] = useState(true);

  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const [flavor, setFlavor] = useState();
  const [catchRate, setCatchRate] = useState("");
  const [happiness, setHappiness] = useState("");
  const [varieties, setVarieties] = useState([]);

  const [variant1, setVariant1] = useState();
  const [variantData1, setVariantData1] = useState();
  const [variant2, setVariant2] = useState();
  const [variantData2, setVariantData2] = useState();
  const [variant3, setVariant3] = useState();
  const [variantData3, setVariantData3] = useState();
  const [variant4, setVariant4] = useState();
  const [variantData4, setVariantData4] = useState();

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
    let abilities = [];
    for (let i = 0; i < pokemon.abilities.length; i++) {
      axios.get(pokemon.abilities[i].ability.url).then(res => {
        const englishEffect = res.data.effect_entries.find(
          e => e.language.name === "en"
        );
        abilities.push({
          name: pokemon.abilities[i].ability.name,
          effect: englishEffect.effect
        });
      });
    }
    setTypes(pokemon.types);
    setAbilities(abilities);
    setAbilityLoading(false);
  }, [pokemon]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon-species/" + id)
      .then(res => {
        let englishText;
        if (gen === 2) {
          englishText = res.data.flavor_text_entries[44];
        } else if (gen === 3) {
          englishText = res.data.flavor_text_entries[41];
        } else if (gen === 4) {
          englishText = res.data.flavor_text_entries[46];
        } else if (gen === 5) {
          englishText = res.data.flavor_text_entries[2];
        } else if (gen === 8) {
          englishText = res.data.flavor_text_entries[28];
        } else if (gen === 12) {
          englishText = res.data.flavor_text_entries[6];
        } else {
          englishText = res.data.flavor_text_entries[7];
        }
        setFlavor(englishText.flavor_text.replace(/(\r\n|\n|\r)/gm, " "));
        setCatchRate(res.data.capture_rate);
        setHappiness(res.data.base_happiness);
        setVarieties(res.data.varieties);
      })
      .then(res => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    for (let i = 0; i < varieties.length; i++) {
      axios.get(varieties[i].pokemon.url).then(res => {
        if (i === 1) {
          setVariantData1(res.data);
          setVariant1(res.data.sprites.front_default);
        } else if (i === 2) {
          setVariantData2(res.data);
          setVariant2(res.data.sprites.front_default);
        } else if (i === 3) {
          setVariantData3(res.data);
          setVariant3(res.data.sprites.front_default);
        } else if (i === 4) {
          setVariantData4(res.data);
          setVariant4(res.data.sprites.front_default);
        }
      });
    }
  }, [varieties]);

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
                source={{ uri: isShiny ? shiny : image }}
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
            <ListItem
              title={"Catch Rate"}
              rightTitle={catchRate + " / 255"}
              bottomDivider
            ></ListItem>
            <ListItem
              title={"Base Friendship"}
              rightTitle={happiness + " / 255"}
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
              Stats
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
            {varieties.length > 1 && (
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Forms
              </Text>
            )}
            {varieties.length >= 2 && (
              <ListItem
                leftAvatar={{
                  source: variant1
                    ? {
                        uri: variant1
                      }
                    : PokeballSprite
                }}
                key={0}
                title={capitalize(varieties[1].pokemon.name)}
                onPress={() =>
                  navigation.navigate("MegaDetails", {
                    name: capitalize(varieties[1].pokemon.name),
                    pokemon: variantData1,
                    image: variant1,
                    id: variantData1.id,
                    flavor: flavor
                  })
                }
                bottomDivider
              ></ListItem>
            )}
            {varieties.length >= 3 && (
              <ListItem
                leftAvatar={{
                  source: variant2
                    ? {
                        uri: variant2
                      }
                    : PokeballSprite
                }}
                key={1}
                title={capitalize(varieties[2].pokemon.name)}
                onPress={() =>
                  navigation.navigate("MegaDetails", {
                    name: capitalize(varieties[2].pokemon.name),
                    pokemon: variantData2,
                    image: variant2,
                    id: variantData2.id,
                    flavor: flavor
                  })
                }
                bottomDivider
              ></ListItem>
            )}
            {varieties.length >= 4 && (
              <ListItem
                leftAvatar={{
                  source: variant3
                    ? {
                        uri: variant3
                      }
                    : PokeballSprite
                }}
                key={1}
                title={capitalize(varieties[3].pokemon.name)}
                onPress={() =>
                  navigation.navigate("MegaDetails", {
                    name: capitalize(varieties[3].pokemon.name),
                    pokemon: variantData3,
                    image: variant3,
                    id: variantData3.id,
                    flavor: flavor
                  })
                }
                bottomDivider
              ></ListItem>
            )}
            {varieties.length >= 5 && (
              <ListItem
                leftAvatar={{
                  source: variant4
                    ? {
                        uri: variant4
                      }
                    : PokeballSprite
                }}
                key={1}
                title={capitalize(varieties[4].pokemon.name)}
                onPress={() =>
                  navigation.navigate("MegaDetails", {
                    name: capitalize(varieties[4].pokemon.name),
                    pokemon: variantData4,
                    image: variant4,
                    id: variantData4.id,
                    flavor: flavor
                  })
                }
                bottomDivider
              ></ListItem>
            )}
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

export default Details;

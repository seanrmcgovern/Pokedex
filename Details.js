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
import { Divider } from "react-native-elements";

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

const Details = props => {
  const { name } = props.route.params;
  const { pokemon } = props.route.params;
  const { image } = props.route.params;
  const { id } = props.route.params;
  const { gen } = props.route.params;

  const [isLoading, setIsLoading] = useState(true);

  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const [flavor, setFlavor] = useState();
  const [catchRate, setCatchRate] = useState("");
  const [happiness, setHappiness] = useState("");

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
        return "violet";
        break;
      case "steel":
        return "grey";
        break;
      case "ice":
        return "#91E9EA";
        break;
      case "dragon":
        return "blue";
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
      })
      .then(res => setIsLoading(false));
  }, [id]);

  return (
    <ScrollView style={{ backgroundColor: "#DE5C58" }}>
      {isLoading && (
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
      {!isLoading && (
        <View>
          <View style={styles.header}>
            {/* <Button
              title="log"
              onPress={() => console.log(pokemon.stats[0])}
            ></Button> */}
            <ImageBackground source={Pokeball} style={styles.image}>
              <Image
                resizeMode="cover"
                source={{
                  uri: image
                }}
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
              Abilities
            </Text>
            <Divider style={{ backgroundColor: "#2189DC", height: 5 }} />
            <View>
              {/* <ListItem title={"Abilities"} bottomDivider></ListItem> */}
              {abilities.map((a, index) => (
                <ListItem
                  title={capitalize(a.name)}
                  subtitle={a.effect}
                  bottomDivider
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

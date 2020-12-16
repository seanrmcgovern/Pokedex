import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { ListItem, Button, Tooltip, Overlay } from "react-native-elements";
import { Root, Toast, Fab } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
// import * as WebBrowser from "expo-web-browser";
import Pokeball from "./assets/pokeball.png";
import PokeballSprite from "./assets/pokeballSprite.png";
import Stats from "./Stats";
import Popover from "./Popover";

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

const Details = ({ navigation, route }) => {
  const { name } = route.params;
  const { image } = route.params;
  const { shiny } = route.params;
  const { id } = route.params;
  const { gen } = route.params;
  const { userId } = route.params;
  const { catchRate } = route.params;
  const { flavor } = route.params;
  const { friendship } = route.params;
  const { height } = route.params;
  const { weight } = route.params;
  const { types } = route.params;
  const { stats } = route.params;
  const { abilities } = route.params;

  const pokeObject = {
    name: name,
    image: image,
    id: id,
    gen: gen,
    shiny: shiny
  };

  const [isShiny, setIsShiny] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(); // the pokemon's current index in the list of favorites
  const [favorites, setFavorites] = useState([]);
  const favorite = () => {
    if (!isFavorite) {
      firebase
        .database()
        .ref("users/" + userId + "/favorites")
        .set([...favorites, pokeObject]);
      showToast(`${name} added to favorites`);
    } else {
      // already is a favorite...want to unfavorite
      let newFavorites = favorites;
      newFavorites.splice(currentIndex, 1);
      firebase
        .database()
        .ref("users/" + userId + "/favorites")
        .set(newFavorites);
      showToast(`${name} removed from favorites`);
      setIsFavorite(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name={isFavorite ? "star" : "star-o"}
          size={20}
          color="white"
          style={styles.headerIcon}
        />
      )
    });
  }, [navigation, isFavorite]);

  const [activeFab, setActiveFab] = useState(false);
  const [popVisible, setPopVisible] = useState(false);
  const togglePopover = () => {
    setPopVisible(!popVisible);
  };
  const showToast = text => {
    Toast.show({
      text: text,
      duration: 5000,
      type: "success"
    });
  };

  const [isLoading, setIsLoading] = useState(true);
  const [abilityLoading, setAbilityLoading] = useState(true);

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

  const openStrategy = () => {
    // if (gen === 1) {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/rb/pokemon/" + name
    //   );
    // } else if (gen === 2) {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/gs/pokemon/" + name
    //   );
    // } else if (gen === 3) {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/rs/pokemon/" + name
    //   );
    // } else if (gen === 4) {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/dp/pokemon/" + name
    //   );
    // } else if (gen === 5) {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/bw/pokemon/" + name
    //   );
    // } else if (gen === 6) {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/xy/pokemon/" + name
    //   );
    // } else if (gen == 7) {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/sm/pokemon/" + name
    //   );
    // } else {
    //   WebBrowser.openBrowserAsync(
    //     "https://www.smogon.com/dex/ss/pokemon/" + name
    //   );
    // }
  };

  // useEffect(() => {
  //   if (!fromCoreData) {
  //     axios
  //       .get("https://pokeapi.co/api/v2/pokemon-species/" + id)
  //       .then(res => {
  //         let englishText = "";
  //         if (gen === 1) {
  //           englishText = res.data.flavor_text_entries[44];
  //         }  else {
  //           englishText = res.data.flavor_text_entries.find(
  //             e => e.language.name === "en"
  //           );
  //         }
  //         setFlavor(englishText.flavor_text.replace(/(\r\n|\n|\r)/gm, " "));
  //         setCatchRate(res.data.capture_rate);
  //         setHappiness(res.data.base_happiness);
  //         setVarieties(res.data.varieties);
  //       })
  //       .then(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [id]);



  //         if (gen === 2) {
  //           // Kanto
  //           englishText = res.data.flavor_text_entries[44];
  //         } else if (gen === 3) {
  //           // Johto
  //           englishText = res.data.flavor_text_entries[41];
  //         } else if (gen === 4) {
  //           // Hoenn
  //           englishText = res.data.flavor_text_entries[46];
  //         } else if (gen === 5) {
  //           // Sinnoh
  //           englishText = res.data.flavor_text_entries[2];
  //         } else if (gen === 8) {
  //           // Unova
  //           englishText = res.data.flavor_text_entries[28];
  //         } else if (gen === 12) {
  //           // Kalos
  //           englishText = res.data.flavor_text_entries[6];
  //         } else {
  //           // Alola
  //           englishText = res.data.flavor_text_entries[7];
  //         }

  // useEffect(() => {
  //   for (let i = 0; i < varieties.length; i++) {
  //     axios.get(varieties[i].pokemon.url).then(res => {
  //       if (i === 1) {
  //         setVariantData1(res.data);
  //         setVariant1(res.data.sprites.front_default);
  //       } else if (i === 2) {
  //         setVariantData2(res.data);
  //         setVariant2(res.data.sprites.front_default);
  //       } else if (i === 3) {
  //         setVariantData3(res.data);
  //         setVariant3(res.data.sprites.front_default);
  //       } else if (i === 4) {
  //         setVariantData4(res.data);
  //         setVariant4(res.data.sprites.front_default);
  //       }
  //     });
  //   }
  // }, [varieties]);

  useEffect(() => {
    firebase
      .database()
      .ref("users/" + userId)
      .on("value", snapshot => {
        const curFavs = snapshot.val().favorites;
        setFavorites(curFavs);
        for (let i = 0; i < curFavs.length; i++) {
          if (curFavs[i].name === name) {
            setIsFavorite(true);
            setCurrentIndex(i);
          }
        }
      });
  }, []);

  return (
    <Root>
      <ScrollView style={{ backgroundColor: "#DE5C58" }}>
          <View>
            <View style={styles.header}>
              <ImageBackground source={Pokeball} style={styles.image}>
                <TouchableOpacity
                  onPress={() => {
                    if (shiny) {
                      setIsShiny(isShiny => !isShiny);
                    }
                  }}
                >
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
                </TouchableOpacity>
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
                subtitle={flavor.replace("\f", " ")}
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
                    value: item ,
                    textStyle: { color: "white", fontSize: 12 },
                    badgeStyle: {
                      backgroundColor: getTypeColor(item),
                      minWidth: 75
                    }
                  }}
                  bottomDivider
                ></ListItem>
              ))}
              <Stats
                hp={stats[0]}
                attack={stats[1]}
                defense={stats[2]}
                specialAttack={stats[3]}
                specialDefense={stats[4]}
                speed={stats[5]}
              ></Stats>
              <ListItem
                title={"Height"}
                rightTitle={height}
                bottomDivider
              ></ListItem>
              <ListItem
                title={"Weight"}
                rightTitle={weight}
                bottomDivider
              ></ListItem>
              <ListItem
                title={"Catch Rate"}
                rightTitle={catchRate + " / 255"}
                bottomDivider
              ></ListItem>
              <ListItem
                title={"Base Friendship"}
                rightTitle={friendship + " / 255"}
                bottomDivider
              ></ListItem>
            </View>
            {/* <View>
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
                hp={stats[0]}
                attack={stats[1]}
                defense={stats[2]}
                specialAttack={stats[3]}
                specialDefense={stats[4]}
                speed={stats[5]}
              ></Stats>
            </View> */}
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
            {abilities.length > 0 && 
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 5,
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
              </View>}
            <ListItem
              title="Competitive Strategies"
              onPress={openStrategy}
              rightIcon={
                <Icon name="chevron-right" size={20} color="#2189DC"></Icon>
              }
            ></ListItem>
          </View>
        <Popover
          visible={popVisible}
          close={togglePopover}
          userId={userId}
          pokeObject={pokeObject}
          showToast={showToast}
        ></Popover>
      </ScrollView>
      <Fab
        active={activeFab}
        direction="up"
        style={{ backgroundColor: "#2189DC" }}
        position="bottomRight"
        onPress={() => setActiveFab(!activeFab)}
      >
        <Icon name="crosshairs" />
        <Button
          style={{
            backgroundColor: "#1CA94C",
            shadowOffset: { width: 0, height: 1 },
            shadowColor: "black",
            shadowOpacity: 0.75
          }}
          onPress={favorite}
        >
          <Icon name="star-o" />
        </Button>
        <Button
          style={{
            backgroundColor: "#DE5C58",
            shadowOffset: { width: 0, height: 1 },
            shadowColor: "black",
            shadowOpacity: 0.75
          }}
          onPress={togglePopover}
        >
          <Icon name="tasks" />
        </Button>
      </Fab>
    </Root>
  );
};

export default Details;

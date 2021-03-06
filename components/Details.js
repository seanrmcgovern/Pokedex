import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Button  } from "react-native-elements";
import { Root, Toast, Fab, Separator } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import * as WebBrowser from "expo-web-browser";
import Pokeball from "../assets/pokeball.png";
import PokeballSprite from "../assets/pokeballSprite.png";
import Stats from "./Stats";
import TypeBadges from "./TypeBadges";
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
  const { pokemon } = route.params;
  const { isNested } = route.params;
  
  const [isShiny, setIsShiny] = useState(false);

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

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const openStrategy = (gen) => {
    if (gen === 1) {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/rb/pokemon/" + pokemon.name
      );
    } else if (gen === 2) {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/gs/pokemon/" + pokemon.name
      );
    } else if (gen === 3) {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/rs/pokemon/" + pokemon.name
      );
    } else if (gen === 4) {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/dp/pokemon/" + pokemon.name
      );
    } else if (gen === 5) {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/bw/pokemon/" + pokemon.name
      );
    } else if (gen === 6) {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/xy/pokemon/" + pokemon.name
      );
    } else if (gen == 7) {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/sm/pokemon/" + pokemon.name
      );
    } else {
      WebBrowser.openBrowserAsync(
        "https://www.smogon.com/dex/ss/pokemon/" + pokemon.name
      );
    }
  };

  // favorites logic
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const favorite = () => {
    toggleFavorite().then(() => getFavorites());
  }

  const toggleFavorite = async () => {
    if (!isFavorite) {
      try {
        let newFavorites = [...favorites, pokemon];
        await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        showToast(`${pokemon.name} added to favorites`);
      } catch (e) {
        console.log(e);
      }
    } else {
      const index = favorites.findIndex((item) => item.id == pokemon.id);
      let newFavorites = favorites;
      newFavorites.splice(index, 1);
      try {
        await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
        showToast(`${pokemon.name} removed from favorites`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getFavorites = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    const formattedFavorites = JSON.parse(favorites);
    const value = formattedFavorites.some((item) => item.id == pokemon.id);
    setIsFavorite(value);
    setFavorites(formattedFavorites);
  }

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is now focused
      // refresh parties
      getFavorites();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    getFavorites();
    for (const ability in pokemon.abilities) {
      const name = ability.name;
      setExpanded({...expanded, [name]: false});
    }
  }, []);

  return (
    <Root>
      <ScrollView style={{ backgroundColor: "#DE5C58" }}>
          <View>
            <View style={styles.header}>
              <ImageBackground source={Pokeball} style={styles.image}>
                <TouchableOpacity
                  onPress={() => {
                    if (pokemon.shiny) {
                      setIsShiny(isShiny => !isShiny);
                    }
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={{ uri: isShiny ? `data:image/jpeg;base64,${pokemon.shiny}` : `data:image/jpeg;base64,${pokemon.image}` }}
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
                subtitle={pokemon.flavor.replace("\f", " ")}
                subtitleStyle={{
                  color: "white",
                  fontSize: 15
                }}
              />
            </View>
            <View>
              <TypeBadges types={pokemon.types}/>
              <Stats
                hp={pokemon.stats[0]}
                attack={pokemon.stats[1]}
                defense={pokemon.stats[2]}
                specialAttack={pokemon.stats[3]}
                specialDefense={pokemon.stats[4]}
                speed={pokemon.stats[5]}
              ></Stats>
              {pokemon.abilities.length > 0 && 
              <View>
                <Separator >
                  <Text style={{fontSize: 16}}>Abilities</Text>
                </Separator>
                <View>
                  {pokemon.abilities.map((a, index) => (
                    <ListItem
                      title={capitalize(a.name)}
                      titleStyle={{ color: "#2189DC" }}
                      subtitle={a.effect}
                      subtitleProps={{numberOfLines: expanded[a.name] ? null : 5}}
                      onPress={() => setExpanded({...expanded, [a.name]: !expanded[a.name]})}
                      bottomDivider
                      key={index}
                    ></ListItem>
                  ))}
                </View>
              </View>}
            </View>
            {pokemon.forms.length > 0 && 
                <View>
                  <Separator>
                    <Text style={{fontSize: 16}}>Forms</Text>
                  </Separator>
                  {pokemon.forms.map((form, index) => (
                    <ListItem
                      leftAvatar={{source: form.image? {uri: `data:image/jpeg;base64,${form.image}`}: PokeballSprite}}
                      key={index}
                      title={form.name}
                      onPress={() => {
                        navigation.push("Details", {
                          name: form.name,
                          pokemon: {...form, abilities: pokemon.abilities, id: pokemon.id, forms: []},
                          isNested: true
                        });
                      }}
                      bottomDivider
                      topDivider
                      rightIcon={<Icon name="chevron-right" size={20} color="#2189DC"></Icon>}
                    ></ListItem>
                  ))}
              </View>
            }
            <ListItem
                title={"Height"}
                rightTitle={`${pokemon.height/10} m`}
                bottomDivider
                topDivider
              ></ListItem>
              <ListItem
                title={"Weight"}
                rightTitle={`${pokemon.weight/10} kg`}
                bottomDivider
              ></ListItem>
              {!isNested && 
                <View>
                  <ListItem
                    title={"Catch Rate"}
                    rightTitle={pokemon.catchRate + " / 255"}
                    bottomDivider
                  ></ListItem>
                  <ListItem
                    title={"Base Friendship"}
                    rightTitle={pokemon.friendship + " / 255"}
                    bottomDivider
                  ></ListItem>
                  <ListItem
                    title="Competitive Strategies"
                    titleStyle={{color: "#2189DC"}}
                    onPress={() => openStrategy(pokemon.generation)}
                    rightIcon={
                      <Icon name="chevron-right" size={20} color="#2189DC"></Icon>
                    }
                  ></ListItem>
                </View>
              }
          </View>
        <Popover
          visible={popVisible}
          close={togglePopover}
          pokemon={pokemon}
          showToast={showToast}
          navigation={navigation}
        ></Popover>
      </ScrollView>
      {!isNested && 
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
        </Fab>}
    </Root>
  );
};

export default Details;

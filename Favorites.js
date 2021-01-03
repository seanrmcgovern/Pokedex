import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Platform
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Card, CardItem, Body } from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Pokeball from "./assets/pokeball.png";
import Sequoia from "./assets/sequoia.png";

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

const Favorites = ({ navigation, route, userId }) => {
  const padding = Platform.OS === 'ios' ? "25%" : "15%";
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round(Dimensions.get("screen").height * 0.3);

  const emptyFavorites = [
    {
      id: "Pokemon you favorite will be listed here.",
      name: "Professor Sequoia here!",
      image: Sequoia
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef();

  const renderCard = ({ item, index }) => {
    const isPokemon = typeof item.id === "number";
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", {
            name: item.name,
            pokemon: item,
            isNested: false,
          });
        }}
      >
        <Card style={{ borderRadius: 40, backgroundColor: "#EDEBED" }}>
          <CardItem
            style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          >
            <Body style={{ alignItems: "center", paddingTop: 10 }}>
              <Text
                style={{
                  // fontFamily: "PingFangHK-Semibold",
                  color: "#2189DC",
                  fontSize: isPokemon ? 25 : 18
                }}
              >
                {item.name}
              </Text>
            </Body>
          </CardItem>
          <CardItem
            cardBody
            style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
          >
            {isPokemon ? (
              <ImageBackground source={Pokeball} style={styles.image}>
                <Image
                  resizeMode="cover"
                  source={{uri: `data:image/jpeg;base64,${item.image}`}}
                  style={{
                    alignSelf: "center",
                    height: ITEM_HEIGHT,
                    width: ITEM_WIDTH * 0.75,
                    resizeMode: "contain"
                  }}
                />
              </ImageBackground>
            ) : (
              <View style={styles.image}>
                <Image
                  resizeMode="cover"
                  source={item.image}
                  style={{
                    alignSelf: "center",
                    height: ITEM_HEIGHT,
                    width: ITEM_WIDTH * 0.75,
                    resizeMode: "contain"
                  }}
                />
              </View>
            )}
          </CardItem>
          <CardItem
            style={{
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              paddingTop: 50
            }}
          >
            <Body style={{ alignItems: "center", color: "" }}>
              <Text
                style={{
                  // fontFamily: "PingFangHK-Semibold",
                  color: "#2189DC"
                }}
              >
                {isPokemon ? `No. ${item.id}` : `${item.id}`}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };

  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    const formattedFavorites = JSON.parse(favorites);
    setFavorites(formattedFavorites);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is now focused
      // refresh parties
      getFavorites();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#DE5C58",
        paddingTop: padding
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Carousel
          ref={ref}
          data={favorites.length > 0 ? favorites : emptyFavorites}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          renderItem={renderCard}
          onSnapToItem={index => setActiveIndex(index)}
        />
      </View>
      <Pagination
        carouselRef={ref}
        tappableDots
        dotsLength={favorites.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          backgroundColor: "#2189DC"
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.92)"
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default Favorites;

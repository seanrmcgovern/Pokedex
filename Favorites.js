import React, { useState, useEffect, useRef } from "react";
import * as firebase from "firebase";
import {
  //   Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Left,
  Body,
  Right
} from "native-base";
import Pokeball from "./assets/pokeball.png";
import Icon from "react-native-vector-icons/FontAwesome";
import Carousel, { Pagination } from "react-native-snap-carousel";

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
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [favorites, setFavorites] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef();

  const renderCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Details", {
            name: capitalize(item.name),
            pokemon: item.pokemon,
            image: item.image,
            id: item.id,
            gen: item.gen,
            shiny: item.shiny,
            userId: userId
          })
        }
      >
        <Card style={{ borderRadius: 40, backgroundColor: "#EDEBED" }}>
          <CardItem
            style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          >
            <Body style={{ alignItems: "center", paddingTop: 10 }}>
              <Text
                style={{
                  fontFamily: "PingFangHK-Semibold",
                  color: "#2189DC",
                  fontSize: 25
                }}
              >
                {item.name}
              </Text>
              {/* <Text note>{item.name}</Text> */}
            </Body>
          </CardItem>
          <CardItem
            cardBody
            style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
          >
            <ImageBackground source={Pokeball} style={styles.image}>
              <Image
                resizeMode="cover"
                source={{ uri: item.image }}
                // style={{
                //   width: 200,
                //   height: 200,
                //   alignSelf: "center",
                //   padding: 0
                // }}
                style={{
                  alignSelf: "center",
                  height: 250,
                  width: 250,
                  resizeMode: "contain"
                }}
              />
            </ImageBackground>
            {/* <Image
            source={{ uri: item.image }}
            style={{ height: 250, width: 250, flex: 1, resizeMode: "contain" }}
          ></Image> */}
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
                  fontFamily: "PingFangHK-Semibold",
                  color: "#2189DC"
                }}
              >
                No. {item.id}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    firebase
      .database()
      .ref("users/" + userId)
      .on("value", snapshot => {
        const curFavs = snapshot.val().favorites;
        curFavs.shift();
        setFavorites(curFavs);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#DE5C58",
        paddingTop: 100
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Carousel
          ref={ref}
          data={favorites}
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

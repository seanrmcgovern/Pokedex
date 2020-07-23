import React from "react";
import Header from "./Header";
import Results from "./Results";
import PokeCard from "./PokeCard";
import Details from "./Details";
import MegaDetails from "./MegaDetails";
import Tab2 from "./Tab2";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { StyleSheet, Text, View, Button } from "react-native";

// TODO:
// change pokecard background to dark gradient?
// Firebase functionalities: list of pokemon caught, favorites, parties for different games
console.disableYellowBox = true;

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Pokedex = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerBackTitleStyle: {
          color: "white"
        },
        headerStyle: {
          backgroundColor: "#2189DC"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
      <Stack.Screen name="Pokedex" component={Header} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="PokeCard" component={PokeCard} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({ navigation, route }) => ({
          title: route.params.name
        })}
      />
      <Stack.Screen
        name="MegaDetails"
        component={MegaDetails}
        options={({ route }) => ({
          title: route.params.name
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // tabBarIcon: ({ focused, color, size }) => {
          //   if (route.name === "Pokedex") {
          //     if (focused) {
          //       return <Icon name="th" type="font-awesome" color="white" />;
          //     }
          //     return <Icon name="th" type="font-awesome" color="#DE5C58" />;
          //   } else {
          //     if (focused) {
          //       return (
          //         <Icon name="user-circle" type="font-awesome" color="white" />
          //       );
          //     }
          //     return (
          //       <Icon name="user-circle" type="font-awesome" color="#DE5C58" />
          //     );
          //   }
          // }
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Pokedex") {
              if (focused) {
                return <Icon name="th" type="font-awesome" color="#2189DC" />;
              }
              return <Icon name="th" type="font-awesome" color="#DE5C58" />;
            } else {
              if (focused) {
                return (
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    color="#2189DC"
                  />
                );
              }
              return (
                <Icon name="user-circle" type="font-awesome" color="#DE5C58" />
              );
            }
          }
        })}
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "white",
          style: {
            backgroundColor: "#2189DC"
          }
        }}
        tabBarOptions={{
          activeTintColor: "#2189DC",
          inactiveTintColor: "#DE5C58",
          style: {
            backgroundColor: "white"
          }
        }}
      >
        <Tab.Screen name="Pokedex" component={Pokedex} />
        <Tab.Screen name="Tab2" component={Tab2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

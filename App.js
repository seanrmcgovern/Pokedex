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
// 1) Add Shiny sprites
// 2) Add Regular list view
// 3) Abilities don't always load

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Pokedex = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerBackTitleStyle: {
          color: "black"
        },
        headerStyle: {
          backgroundColor: "#2189DC"
        },
        headerTintColor: "black",
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
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Pokedex") {
              return <Icon name="th" type="font-awesome" color="#f50" />;
            }
            return <Icon name="meh-o" type="font-awesome" color="#f50" />;
          }
        })}
        tabBarOptions={
          {
            //activeTintColor: "tomato",
            //inactiveTintColor: "gray",
            // style: {
            //   backgroundColor: "#2189DC",
            // }
          }
        }
      >
        <Tab.Screen name="Pokedex" component={Pokedex} />
        <Tab.Screen name="Tab2" component={Tab2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

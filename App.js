import React from "react";
import Header from "./Header";
import Results from "./Results";
import PokeCard from "./PokeCard";
import Details from "./Details";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
//import { withNavigation } from "react-navigation";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
          options={({ route }) => ({
            title: route.params.name
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

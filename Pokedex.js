import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./Dashboard";
import Details from "./Details";

const Stack = createStackNavigator();

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
        <Stack.Screen name="Pokedex">
          {props => <Dashboard {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation, route }) => ({
            title: route.params.name
          })}
        />
      </Stack.Navigator>
    );
  };

export default Pokedex;
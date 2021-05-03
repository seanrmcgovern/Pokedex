import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import Details from "./Details";

const Stack = createStackNavigator();

const ProfileTab = (props) => {
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
            fontWeight: "bold",
            fontWeight: "bold",
            alignSelf: 'center',
            textAlign: "center",
          }
        }}
      >
        <Stack.Screen
          name="Profile"
          options={({ navigation, route }) => ({
            title: props.username
          })}
        >
          {props => <Profile {...props} />}
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

export default ProfileTab;
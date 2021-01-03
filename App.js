import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import * as ScreenOrientation from "expo-screen-orientation";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Results from "./Results";
import PokeCard from "./PokeCard";
import Details from "./Details";
import Profile from "./Profile";

// add detox tests

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
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
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="PokeCard" component={PokeCard} />
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

  const ProfileTab = () => {
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
        <Stack.Screen
          name="Profile"
          options={({ navigation, route }) => ({
            title: username
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

  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  const initializeUser = async (name) => {
    try {
      const user = ["username", name];
      const parties = ["parties", JSON.stringify([{title: "Party 1", items: []}, {title: "Party 2", items: []}, {title: "Party 3", items: []}])];
      const favorites = ["favorites", JSON.stringify([])];
      // await AsyncStorage.setItem("username", name);
      await AsyncStorage.multiSet([user, parties, favorites]);
      setUsername(name);
    } catch (e) {
      console.log(e);
    }
  };

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      setUsername(value);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    getUsername().then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ height: "100%" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <AppLoading></AppLoading>
        </View>
      </View>
    );
  }

  if (username !== null) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Pokedex") {
                if (focused) {
                  return <Icon name="th" type="font-awesome" color="#2189DC" />;
                }
                return <Icon name="th" type="font-awesome" color="#8e8e93" />;
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
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    color="#8e8e93"
                  />
                );
              }
            }
          })}
          tabBarOptions={{
            activeTintColor: "#2189DC",
            style: {
              backgroundColor: "white"
            }
          }}
        >
          <Tab.Screen name={"Pokedex"} component={Pokedex} />
          <Tab.Screen name={"Profile"} component={ProfileTab} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } 
  else { // finished loading and username is null
    return <Login initializeUser={initializeUser} />;
  }

};

export default App;

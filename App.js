import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import Constants from "expo-constants";
import { View, ActivityIndicator } from "react-native";
import Login from "./Login";
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

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.REACT_NATIVE_FIREBASE_KEY,
  authDomain: Constants.manifest.extra.REACT_NATIVE_FIREBASE_DOMAIN,
  databaseURL: Constants.manifest.extra.REACT_NATIVE_FIREBASE_URL,
  projectId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.REACT_NATIVE_FIREBASE_BUCKET,
  appId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

// TODO:
// make apikey private
// Firebase functionalities: list of pokemon caught, favorites, parties for different games
// toast, button
// images needed: default profile pic, main logo, loading gif
// add moves to details page?
console.disableYellowBox = true;

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState();

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
          {props => <Header {...props} userId={userId} />}
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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      setUser(user);
      setUserId(uid);
    } else {
      // User is signed out.
    }
  });

  const initializeUser = name => {
    if (name != "") {
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          username: name,
          parties: [
            { title: "New Party 1", items: [{ name: "head" }] },
            { title: "New Party 2", items: [{ name: "head" }] },
            { title: "New Party 3", items: [{ name: "head" }] }
          ]
        })
        .then(() => {
          user.updateProfile({
            displayName: name
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          });
        });
    }
  };

  firebase
    .database()
    .ref("users/" + userId)
    .on("value", snapshot => {
      if (snapshot.val() && snapshot.val().username && !username) {
        const username = snapshot.val().username;
        setUsername(username);
      }
    });

  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }, []);

  const Profile = () => {
    return <Tab2 username={username} userId={userId}></Tab2>;
  };

  if (user && username) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
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
                  <Icon
                    name="user-circle"
                    type="font-awesome"
                    color="#DE5C58"
                  />
                );
              }
            }
          })}
          tabBarOptions={{
            activeTintColor: "#2189DC",
            inactiveTintColor: "#DE5C58",
            style: {
              backgroundColor: "white"
            }
          }}
        >
          <Tab.Screen name={"Pokedex"} component={Pokedex} />
          <Tab.Screen name={"Profile"} component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  if (user && !username) {
    return <Login initializeUser={initializeUser} />;
  }

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
          marginTop: 300
        }}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    </View>
  );
};

export default App;

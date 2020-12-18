import React, { useEffect, useState } from "react";
import { registerRootComponent } from 'expo';
import * as firebase from "firebase";
import { View, ActivityIndicator, NativeModules } from "react-native";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Results from "./Results";
import PokeCard from "./PokeCard";
import Details from "./Details";
import MegaDetails from "./MegaDetails";
import Profile from "./Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { LogBox } from "react-native";

// PRIORITY ONE
// 1) Figure out how to best store and varieties of pokemon

// PRIORITY TWO
// Primarily use Core Data
// Store parties/favorites in core data, sync with firebase
// Keep Firebase in sync every once in a while, in case user deletes&redownloads the app
// Still use Firebase for user authentication, 
//      but we might want to switch to something like google authentication 
//      so users can return to their account after deleting the app
//      then if they redownload and sign in we can initialize their previously saved parties/favorites

// PRIORITY THREE
// Redo firebase env config for native development, if still using firebase
// Database functionalities: rename party, username
// add moves to details page

const firebaseConfig = {
  apiKey: "AIzaSyD2417qygaMrOPhGx0hd1Fmrtm__zcQYYo",
  authDomain: "pokedex-smcg.firebaseapp.com",
  databaseURL: "https://pokedex-smcg.firebaseio.com",
  projectId: "pokedex-smcg",
  storageBucket: "pokedex-smcg.appspot.com",
  appId: "1:654908820997:ios:0fb638857d45ca90fc966c"
};
// Initialize Firebase
// const firebaseConfig = {
//   apiKey: Constants.manifest.extra.REACT_NATIVE_FIREBASE_KEY,
//   authDomain: Constants.manifest.extra.REACT_NATIVE_FIREBASE_DOMAIN,
//   databaseURL: Constants.manifest.extra.REACT_NATIVE_FIREBASE_URL,
//   projectId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_PROJECT_ID,
//   storageBucket: Constants.manifest.extra.REACT_NATIVE_FIREBASE_BUCKET,
//   appId: Constants.manifest.extra.REACT_NATIVE_FIREBASE_APP_ID
// };

firebase.initializeApp(firebaseConfig);

LogBox.ignoreAllLogs();

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
          {props => <Dashboard {...props} userId={userId} />}
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
          {props => <Profile {...props} userId={userId} />}
        </Stack.Screen>
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

  const [user, setUser] = useState();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(0);

  const initializeUser = name => {
    if (name != "") {
      NativeModules.UserInfo.saveCredentials(name, userId);
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          username: name,
          parties: [
            { title: "Party 1", items: [{ name: "head" }] }
          ],
          favorites: [{ name: "head" }]
        })
        .then(() => {
          user.updateProfile({
            displayName: name
          });
        });
    }
  };

  // firebase
  //   .database()
  //   .ref("users/" + userId)
  //   .on("value", snapshot => {
  //     if (snapshot.val() && snapshot.val().username && !username) {
  //       const username = snapshot.val().username;
  //       setUsername(username);
  //     }
  //   });

  useEffect(() => {
    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(res => {
    //     if (res.user.displayName === null) {
    //       setLoading(1);
    //     }
    //     setUser(res.user);
    //     setUserId(res.user.uid);
    //   });
    NativeModules.UserInfo.getCredentials((name, id) => {
      if (name === null) {
        setLoading(1);
      }
      setUsername(name);
      setUserId(id);
    });
  }, []);

  useEffect(() => {
    if (username != null && username != "") {
      setLoading(2);
    }
  }, [username]);

  if (loading === 2) {
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
          <Tab.Screen name={"Profile"} component={ProfileTab} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } 
  else if (loading === 1) {
    return <Login initializeUser={initializeUser} />;
  }

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator color="#2189DC" />
      </View>
    </View>
  );
};

registerRootComponent(App);
// export default App;

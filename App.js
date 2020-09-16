import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import * as ScreenOrientation from "expo-screen-orientation";
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
// import Constants from "expo-constants";

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

// TODO:
// Redo firebase env config for native development (expo not available)
// Firebase functionalities: rename party, username
// carousel for details image
// add moves to details page
console.disableYellowBox = true;

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
            { title: "New Party 1", items: [{ name: "head" }] },
            { title: "New Party 2", items: [{ name: "head" }] },
            { title: "New Party 3", items: [{ name: "head" }] }
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
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    firebase
      .auth()
      .signInAnonymously()
      .then(res => {
        if (res.user.displayName === null) {
          setLoading(1);
        }
        setUser(res.user);
        setUserId(res.user.uid);
      });
    NativeModules.UserInfo.getCredentials((name, id) => {
      // console.log("username from native: " + name);
      // console.log("id from native: ", id);
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
  } else if (loading === 1) {
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

export default App;

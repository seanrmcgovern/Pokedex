import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import * as ScreenOrientation from "expo-screen-orientation";
import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import BerryView from "./components/screens/BerryView";
import TechnicalMachineView from "./components/screens/TechnicalMachineView";

const Drawer = createDrawerNavigator();

const App = () => {
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  const initializeUser = async (name) => {
    try {
      const user = ["username", name];
      const parties = [
        "parties",
        JSON.stringify([
          { title: "Party 1", items: [] },
          { title: "Party 2", items: [] },
          { title: "Party 3", items: [] },
        ]),
      ];
      const favorites = ["favorites", JSON.stringify([])];
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
  };

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
            justifyContent: "center",
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
        <Drawer.Navigator drawerPosition="left">
          <Drawer.Screen
            name="Home"
            children={() => <Home username={username} />}
          />
          <Drawer.Screen name="TMs" component={TechnicalMachineView} />
          <Drawer.Screen name="Berries" component={BerryView} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    // finished loading and username is null
    return <Login initializeUser={initializeUser} />;
  }
};

export default App;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import Pokedex from "./Pokedex";
import ProfileTab from "./ProfileTab";

const Tab = createBottomTabNavigator();

const Home = (props) => {
    return (
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
                  return (<Icon name="user-circle" type="font-awesome" color="#2189DC"/>);
                }
                return (<Icon name="user-circle" type="font-awesome" color="#8e8e93"/>);
              }
            }
          })}
          tabBarOptions={{activeTintColor: "#2189DC",style: {backgroundColor: "white"}}}
        >
          <Tab.Screen name={"Pokedex"} component={Pokedex} />
          <Tab.Screen name={"Profile"} children={() => <ProfileTab username={props.username}/>}/>
      </Tab.Navigator>
    )
  }

export default Home;
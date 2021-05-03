import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Berries from "../Berries";

const Stack = createStackNavigator();

const BerryView = () => {

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
            <Stack.Screen name="Berries" component={Berries}/>
        </Stack.Navigator>
    )

}

export default BerryView;
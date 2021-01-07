import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BerriesScreen from "./BerriesScreen";

const Stack = createStackNavigator();

const BerryStack = (props) => {

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
            <Stack.Screen name="Berries" component={BerriesScreen}/>
        </Stack.Navigator>
    )

}

export default BerryStack;
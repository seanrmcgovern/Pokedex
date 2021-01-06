import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";

const BerriesScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    )
};

export default BerriesScreen;
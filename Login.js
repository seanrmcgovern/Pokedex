import React, { useState } from "react";
import { View, Text } from "react-native";
import { Icon, Input, Button } from "react-native-elements";

const Login = props => {
  const [username, setUsername] = useState("");

  const register = () => {
    if (username != "") {
      props.initializeUser(username);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
          marginTop: 300
        }}
      >
        <View style={{ margin: 10 }}>
          <Text>Welcome to the world of Pokemon!</Text>
          <Text>Enter your name and embark upon your own journey!</Text>
        </View>
        <Input
          placeholder="Ex: AshKetchum1997"
          label="Username"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => {
              register();
            }}
            title="Register"
            disabled={username === ""}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

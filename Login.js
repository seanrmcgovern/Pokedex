import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import Sequoia from "./assets/sequoia.png";

const styles = StyleSheet.create({
  title: {
    fontFamily: "PingFangHK-Semibold",
    color: "#2189DC"
  }
});

const Login = props => {
  const [username, setUsername] = useState("");

  const [creatingAccount, setCreatingAccount] = useState(false);

  const register = () => {
    setCreatingAccount(true);
  };

  useEffect(() => {
    if (creatingAccount) {
      props.initializeUser(username);
    }
    setCreatingAccount(false);
  }, [creatingAccount]);

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
          marginTop: 100
        }}
      >
        <View style={{ margin: 10, alignItems: "center" }}>
          <Image source={Sequoia} style={{ width: 300, height: 300 }}></Image>
          <Text style={styles.title}>Hello there! I am Professor Sequoia.</Text>
          <Text style={styles.title}>Welcome to the world of Pokemon!</Text>
          <Text style={styles.title}>
            Enter your name and embark upon your own journey!
          </Text>
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
            title={creatingAccount ? "" : "Create Account"}
            disabled={username === "" || creatingAccount}
            icon={
              creatingAccount ? <ActivityIndicator color="#2189DC" /> : <></>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Login;

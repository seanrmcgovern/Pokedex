import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "native-base";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: 55,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  }
});

const TypeBadges = props => {

    const getTypeInfo = type => {
        switch (type) {
          case "grass":
            return {color: "green", icon: "leaf", type: "font-awesome-5"};
            break;
          case "poison":
            // "skull"
            return {color: "purple", icon: "disease" , type: "font-awesome-5"};
            break;
          case "water":
            return {color: "#2189DC", icon: "water", type: "ionicon"};
            break;
          case "fire":
            return {color: "orange", icon: "local-fire-department", type: "material"};
            break;
          case "rock":
            return {color: "#AC7901", icon: "octagram-outline", type: "material-community"};
            break;
          case "flying":
            return {color: "#C8B9CE", icon: "feather", type: "font-awesome-5"};
            break;
          case "fairy":
            return {color: "violet", icon:"hexagram-outline", type: "material-community"};
            break;
          case "psychic":
            return {color: "#C94AEE", icon: "eye", type: "font-awesome-5"};
            break;
          case "ground":
            return {color: "#7F6526", icon: "mountains", type: "foundation"};
            break;
          case "bug":
            return {color: "#BBEF57", icon: "bug", type: "font-awesome-5"};
            break;
          case "normal":
            return {color: "tan", icon: "dot-circle", type: "font-awesome-5"};
            break;
          case "fighting":
            return {color: "brown", icon: "hand-rock", type: "font-awesome-5"};
            break;
          case "dark":
            return {color: "#3F4448", icon: "moon-waning-gibbous", type: "material-community"};
            break;
          case "steel":
            return {color: "grey", icon: "hexagon-slice-6", type: "material-community"};
            break;
          case "ice":
            return {color: "#91E9EA", icon: "snowflake", type: "font-awesome-5"};
            break;
          case "dragon":
            return {color: "#35328D", icon: "dragon", type: "font-awesome-5"};
            break;
          case "ghost":
            return {color: "#936BA4", icon: "ghost", type: "material-community"};
            break;
          case "electric":
            return {color: "#F6D812", icon: "zap", type: "feather"};
            break;
        }
    };

  return (
    <View>
      <View style={styles.row}>
        {props.types.map((t,index) => 
            <Badge style={{backgroundColor: getTypeInfo(t).color, color: "white", flexDirection:'row', flexWrap:'wrap',  minWidth: 150, marginTop: 10, marginRight: index === 0 ? 10 : 0, height: 35}}>
                <Icon name={getTypeInfo(t).icon} type={getTypeInfo(t).type} color="white" style={{marginTop: 2}}/>
                <Text style={{ color: "white", fontSize: 16, marginLeft: 15, marginTop: 5}}>{t.toUpperCase()}</Text>
            </Badge>
        )}
      </View>
    </View>
  );
};

export default TypeBadges;
import React from "react";
import { ListItem } from "react-native-elements";

const ListRow = props => {

  return (
    <ListItem
      onPress={() =>
        props.navigation.navigate("Details", {
          name: props.pokemon.name,
          pokemon: props.pokemon,
          isNested: false,
          userId: props.userId,
        })
      }
      title={props.pokemon.name}
      leftAvatar={{
        source: {uri:  `data:image/jpeg;base64,${props.pokemon.image}`}
      }}
      rightSubtitle={`No. ${props.pokemon.id}`}
      bottomDivider
      containerStyle={{borderRadius: 35, marginBottom: 3}}
      // style={{ borderBottomWidth: 1, borderBottomColor: "#2189DC" }}
    ></ListItem>
  );
};

export default ListRow;

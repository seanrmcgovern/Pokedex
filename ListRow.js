import React from "react";
import { ListItem } from "react-native-elements";

const ListRow = props => {

  return (
    <ListItem
      onPress={() =>
        props.navigation.navigate("Details", {
          pokemon: props.pokemon,
          userId: props.userId,
        })
      }
      title={props.pokemon.name}
      leftAvatar={{
        source: {uri:  `data:image/jpeg;base64,${props.pokemon.image}`}
      }}
      rightSubtitle={`No. ${props.pokemon.id}`}
      bottomDivider
      style={{ borderBottomWidth: 1, borderBottomColor: "#2189DC" }}
    ></ListItem>
  );
};

export default ListRow;

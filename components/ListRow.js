import React from "react";
import { ListItem } from "react-native-elements";

const ListRow = (props) => {
  return (
    <ListItem
      onPress={() =>
        props.navigation.navigate("Details", {
          name: props.pokemon.name,
          pokemon: props.pokemon,
          isNested: false,
        })
      }
      title={props.pokemon.name}
      leftAvatar={{
        source: { uri: `data:image/jpeg;base64,${props.pokemon.image}` },
      }}
      rightSubtitle={`No. ${props.pokemon.id}`}
      bottomDivider
      containerStyle={{
        borderRadius: 35,
        marginBottom: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "black",
        shadowOpacity: 0.5,
      }}
      underlayColor={"#DE5C58"}
    ></ListItem>
  );
};

export default ListRow;

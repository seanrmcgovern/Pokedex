import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";

const ListRow = props => {



  return (
    <ListItem
      onPress={() =>
        props.navigation.navigate("Details", {
          name: props.name,
          image: `data:image/jpeg;base64,${props.image}`,
          id: props.entryId,
          // shiny: shiny,
          gen: props.gen,
          userId: props.userId,
          catchRate: props.catchRate,
          flavor: props.flavor,
          friendship: props.friendship,
          height: props.height,
          weight: props.weight,
          types: props.types,
          stats: props.stats
        })
      }
      title={props.name}
      leftAvatar={{
        source: {uri:  `data:image/jpeg;base64,${props.image}`}
      }}
      rightSubtitle={`No. ${props.entryId}`}
      bottomDivider
      style={{ borderBottomWidth: 1, borderBottomColor: "#2189DC" }}
    ></ListItem>
  );
};

export default ListRow;

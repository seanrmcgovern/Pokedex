import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListItem } from "react-native-elements";

const ListRow = props => {
  const [pokemon, setPokemon] = useState();
  const [id, setId] = useState();
  const [sprite, setSprite] = useState("");
  const [shiny, setShiny] = useState();

  useEffect(() => {
    axios.get(props.url).then(res => {
      setPokemon(res.data);
      setId(res.data.id);
      setSprite(res.data.sprites.front_default);
      setShiny(res.data.sprites.front_shiny);
    });
  }, []);

  return (
    <ListItem
      onPress={() =>
        props.navigation.navigate("Details", {
          name: props.name,
          pokemon: pokemon,
          image: sprite,
          id: id,
          gen: props.gen,
          shiny: shiny
        })
      }
      title={props.name}
      leftAvatar={{
        source: {
          uri: sprite
        }
      }}
      bottomDivider
    ></ListItem>
  );
};

export default ListRow;

import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, StyleSheet} from "react-native";
import axios from "axios";
import { ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: "#DE5C58",
      borderTopWidth: 0,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  });

const BerriesScreen = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button 
                    title="Back"
                    titleStyle={{marginTop: 5}}
                    onPress={() => navigation.goBack()}
                    icon={<Icon name={"angle-left"} size={35} color="white" style={{marginRight: 5}}/>}
                />
            )
        });
      }, [navigation]);

    const renderRow = useCallback(
        ({ item }) => {
            return (
              <ListItem 
                topDivider 
                bottomDivider 
                title={item.name} 
                leftAvatar={{
                    source: {uri:  item.sprite}
                }}
                containerStyle={{borderRadius: 35, marginBottom: 3}}
                underlayColor={"#DE5C58"}
              />
            );
        }
    );

    const [berries, setBerries] = useState([]);

    const getBerry = async (id) => {
        let updatedBerries = berries;
        let res = await axios.get("https://pokeapi.co/api/v2/item/" + id);
        updatedBerries.push({name: res.data.name, category: res.data.category.name, effect: res.data.effect_entries[0].effect, sprite: res.data.sprites.default});
        setBerries(updatedBerries);
        return res;
    }

    const range = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx)

    useEffect(() => {
        // items/ 126 - 189
        const berryIds = range(126, 189);
        Promise.all(berryIds.map(id => getBerry(id)));
    }, []);

    return (
        <View style={{ flex: 1, paddingTop: 100 }}>
            <Button onPress={() => console.log(berries)} title="Go back home" />
            <FlatList 
                data={berries} 
                renderItem={renderRow} 
                contentContainerStyle={{
                    paddingTop: 5,
                    paddingBottom: 50,
                    marginLeft: 10,
                    marginRight: 10
                }}
                style={styles.scrollView}>
            </FlatList> 
        </View>
    )
};

export default BerriesScreen;
import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, FlatList, StyleSheet, Text} from "react-native";
import axios from "axios";
import { ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet from 'react-native-bottomsheet-reanimated';

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

    const sheetRef = useRef(null);  

    const SheetHeader = () => (
        <View>
            <Text style={{fontWeight: "bold", fontSize: 20, color: "#2189DC"}}>{selectedBerry.name}{` Berry`}</Text>
        </View>
    );

    const SheetContent = () => (
        <View style={{padding: 15, paddingTop: 0}}>
            <Text style={{fontSize: 16, color: "#2189DC", fontWeight: "bold", marginBottom: 2}}>Category</Text>
            <Text style={{marginBottom: 10}}>{selectedBerry.category}</Text>
            <Text style={{fontSize: 16, color: "#2189DC", fontWeight: "bold", marginBottom: 2}}>Effect</Text>
            <Text>{selectedBerry.effect}</Text>
        </View>
    );

    const renderRow = useCallback(
        ({ item }) => {
            return (
              <ListItem 
                topDivider 
                bottomDivider 
                title={item.name + ` Berry`} 
                leftAvatar={{
                    source: {uri:  item.sprite}
                }}
                containerStyle={{borderRadius: 35, marginBottom: 3}}
                underlayColor={"#DE5C58"}
                onPress={() =>  {
                        setSelectedBerry(item);
                        sheetRef.current.snapTo(1);
                    }
                }
              />
            );
        }
    );

    const keyExtractor = useCallback((item) => item.name, []);

    const [berries, setBerries] = useState([]);

    const [selectedBerry, setSelectedBerry] = useState("");

    const capitalize = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const getBerry = async (id) => {
        let updatedBerries = berries;
        let res = await axios.get("https://pokeapi.co/api/v2/item/" + id);
        updatedBerries.push({name: capitalize(res.data.name.substring(0, res.data.name.indexOf('-'))), category: capitalize(res.data.category.name.replace("-", " ")), effect: res.data.effect_entries[0].effect.replace(/(\r\n|\n|\r|\f)/gm, " "), sprite: res.data.sprites.default});
        setBerries(updatedBerries.sort((a, b) => (a.name > b.name ? 1 : -1)));
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
            <FlatList 
                data={berries} 
                renderItem={renderRow} 
                contentContainerStyle={{
                    paddingTop: 5,
                    paddingBottom: 50,
                    marginLeft: 10,
                    marginRight: 10
                }}
                keyExtractor={keyExtractor}
                style={styles.scrollView}>
            </FlatList> 
            <BottomSheet
                bottomSheerColor="#FFFFFF"
                ref={sheetRef}
                initialPosition={'0%'}
                snapPoints={['0%','50%', '100%']}
                isBackDrop={true}
                isBackDropDismissByPress={true}
                isRoundBorderWithTipHeader={true}
                containerStyle={{backgroundColor: "white"}}
                tipStyle={{backgroundColor:"#2189DC"}}
                header={<SheetHeader/>}
                body={<SheetContent/>}
            />
        </View>
    )
};

export default BerriesScreen;
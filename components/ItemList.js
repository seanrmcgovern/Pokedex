import React, { useState, useCallback, useRef } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet from "react-native-bottomsheet-reanimated";

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#DE5C58",
    borderTopWidth: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const ItemList = (props) => {
  // firstHeader, secondHeader props
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <Button
          title="Back"
          titleStyle={{ marginTop: 5 }}
          onPress={() => props.navigation.goBack()}
          icon={
            <Icon
              name={"angle-left"}
              size={35}
              color="white"
              style={{ marginRight: 5 }}
            />
          }
        />
      ),
    });
  }, [props.navigation]);

  const sheetRef = useRef(null);

  const SheetHeader = () => (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#2189DC" }}>
        {`${selectedItem.name} ${selectedItem.suffix}`}
      </Text>
    </View>
  );

  const SheetContent = () => (
    <View style={{ padding: 15, paddingTop: 0 }}>
      <Text
        style={{
          fontSize: 16,
          color: "#2189DC",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        {selectedItem.firstHeader}
      </Text>
      <Text style={{ marginBottom: 10 }}>{selectedItem.category}</Text>
      <Text
        style={{
          fontSize: 16,
          color: "#2189DC",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        {selectedItem.secondHeader}
      </Text>
      <Text>{selectedItem.effect}</Text>
    </View>
  );

  const renderRow = useCallback(({ item }) => {
    return (
      <ListItem
        topDivider
        bottomDivider
        title={item.name + " " + item.suffix}
        leftAvatar={{
          source: { uri: item.sprite },
        }}
        containerStyle={{ borderRadius: 35, marginBottom: 3 }}
        underlayColor={"#DE5C58"}
        onPress={() => {
          setSelectedItem(item);
          sheetRef.current.snapTo(1);
        }}
      />
    );
  });

  const keyExtractor = useCallback((item) => item.id, []);

  const [selectedItem, setSelectedItem] = useState({ id: 0 });

  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      <FlatList
        data={props.items}
        renderItem={renderRow}
        contentContainerStyle={{
          paddingTop: 5,
          paddingBottom: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
        keyExtractor={keyExtractor}
        style={styles.scrollView}
      ></FlatList>
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={sheetRef}
        initialPosition={"0%"}
        snapPoints={["0%", "50%", "100%"]}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        containerStyle={{ backgroundColor: "white" }}
        tipStyle={{ backgroundColor: "#2189DC" }}
        header={<SheetHeader />}
        body={<SheetContent />}
      />
    </View>
  );
};

export default ItemList;

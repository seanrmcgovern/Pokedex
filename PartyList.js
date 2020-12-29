import React, { useState, useRef, useEffect } from "react";
import { View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Button, ButtonGroup, Input } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200}></Transition.In>
    <Transition.Change></Transition.Change>
    <Transition.Out type="fade" durationMs={200}></Transition.Out>
  </Transition.Together>
);

const PartyList = props => {
  const [open, setOpen] = useState(false);
  const height = open ? "auto" : 0;
  const ref = useRef();

  const [newTitle, setNewTitle] = useState(props.title);

  const saveChanges = async () => {
    let newParties = props.parties;
    newParties[props.partyIndex].title = newTitle;
    await AsyncStorage.setItem("parties", JSON.stringify(newParties));
  }

  const handleItemDeletion = (index) => {
    deletePartyItem(index).then(() => props.refresh());
  }
  
  const deletePartyItem = async (index) => {
    let newParty = props.party;
    newParty.splice(index, 1);
    newParties = props.parties;
    newParties[props.partyIndex].items = newParty;
    await AsyncStorage.setItem("parties", JSON.stringify(newParties));
  };

  const deleteParty = async () => {
    let newParties = props.parties;
    const deletedParty = props.parties[props.partyIndex];
    newParties.splice(props.partyIndex, 1);
    await AsyncStorage.setItem("parties", JSON.stringify(newParties));
    props.showToast(`Deleted party: "${deletedParty.title}"`);
  }

  const [editActive, setEditActive] = useState(false);
  const handleButtonPress = index => {
    if (index == 0) {
      Alert.alert(
        'Do you want to delete this party?',
        'You cannot undo this action, but you can manually recreate the party later',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => {
            deleteParty().then(() => {
              props.refresh();
            });
          } }
        ],
        { cancelable: false }
      );
    } else {
      saveChanges().then(() => {
        setEditActive(!editActive);
      });
    }
  };

  const button1 = () => <Icon name="trash-o" size={20} color="#DE5C58" />

  const button2 = () =>
    editActive ? (
      <Icon name="pencil-square" size={20} color="#2189DC" />
    ) : (
      <Icon name="pencil-square-o" size={20} color="#2189DC" />
    );
  const buttons = [{ element: button1 }, { element: button2 }];

  useEffect(() => {
    setNewTitle(props.title);
  }, [props.title]);

  return (
    <View>
      <Transitioning.View transition={transition} ref={ref}>
        <TouchableWithoutFeedback
          onPress={() => {
            setOpen(prev => !prev);
            if (editActive) {
              saveChanges();
              setEditActive(false);
            }
            // ref.current.animateNextTransition();
          }}
        >
          <View
            style={{
              backgroundColor: "#EDEBED",
              padding: 15,
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              borderBottomWidth: 0.5,
              borderBottomColor: "#D3D3D3"
            }}
          >
            <Input
              // label="Username"
              value={newTitle}
              onChangeText={text => setNewTitle(text)}
              disabled={!editActive}
              inputContainerStyle={editActive ? {} : {borderBottomWidth:0}}
              inputStyle={{textDecorationLine: "none"}}
              rightIcon={open ? (
                <Icon name="chevron-down" size={20} color="#2189DC"></Icon>
              ) : (
                <Icon name="chevron-right" size={20} color="#2189DC"></Icon>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            height: height,
            overflow: "hidden"
          }}
        >
          {props.party.length == 0 && 
            <ListItem
              title={"Party is currently empty."}
              bottomDivider
              containerStyle={{ backgroundColor: "#F4F3F4" }}
            ></ListItem>}
          {props.party.map(
            (item, index) =>
              (
                <ListItem
                  onPress={() => {
                    props.navigation.navigate("Details", {
                      name: item.name,
                      pokemon: item,
                      isNested: false,
                    });
                  }}
                  title={item.name}
                  leftAvatar={{
                    source: {uri: `data:image/jpeg;base64,${item.image}`}
                  }}
                  bottomDivider
                  containerStyle={{ backgroundColor: "#F4F3F4" }}
                  rightIcon={
                    editActive ? (
                      <Button
                        onPress={() => handleItemDeletion(index)}
                        buttonStyle={{
                          backgroundColor: "white",
                          borderColor: "#DE5C58",
                          borderWidth: 1
                        }}
                        icon={
                          <Icon
                            name="trash-o"
                            size={20}
                            color="#DE5C58"
                          ></Icon>
                        }
                      ></Button>
                    ) : (
                      ""
                    )
                  }
                ></ListItem>
              )
          )}
          <ButtonGroup
            onPress={handleButtonPress}
            buttons={buttons}
            containerStyle={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              backgroundColor: "#F4F3F4"
            }}
          />
        </View>
      </Transitioning.View>
    </View>
  );
};

export default PartyList;

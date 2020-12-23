import React, { useState, useEffect } from "react";
import { ListItem, Overlay, Input, Button } from "react-native-elements";
import { View, Text, ActivityIndicator, NativeModules } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { screensEnabled } from "react-native-screens";

const Popover = props => {
  const [parties, setParties] = useState([]);
  const [newParty, setNewParty] = useState("");

  const [creatingParty, setCreatingParty] = useState(false);

  const createParty = () => {
    setCreatingParty(true);
  };

  useEffect(() => {
    let curCount = partyCount;
    if (creatingParty) {
      // NativeModules.PartyBridge.createPartyWithItem(
      //   newParty,
      //   props.pokeObject,
      //   partyCount // curCount
      // );
      // NativeModules.UserInfo.incrementPartyCount(count => {
      //   console.log("newcount: ", count);
      //   setPartyCount(count);
      // });

      const newName = newParty;
      // firebase
      //   .database()
      //   .ref("users/" + props.userId + "/parties")
      //   .set([
      //     ...parties,
      //     {
      //       title: newName,
      //       items: [{ name: "head" }, props.pokeObject],
      //       id: curCount
      //     }
      //   ])
      //   .then(() => {
      //     setCreatingParty(false);
      //     setNewParty("");
      //     props.showToast(
      //       `Created party: "${newName}" with ${props.pokeObject.name}`
      //     );
      //     props.close();
      //   });
    }
  }, [creatingParty]);

  const [loadingChange, setLoadingChange] = useState();

  const addToParty = index => {
    setLoadingChange(index);
  };

  // useEffect(() => {
  //   if (typeof loadingChange === "number") {
  //     let newParties = parties;
  //     newParties[loadingChange].items.push(props.pokeObject);
  //     firebase
  //       .database()
  //       .ref("users/" + props.userId + "/parties")
  //       .set(newParties)
  //       .then(() => {
  //         setLoadingChange(false);
  //         props.showToast(
  //           `${props.pokeObject.name} added to party: ${newParties[loadingChange].title}`
  //         );
  //         setNewParty("");
  //         setLoadingChange();
  //         props.close();
  //       });
  //   }
  // }, [loadingChange]);

  const [coreParties, setCoreParties] = useState([]);
  const [partyCount, setPartyCount] = useState([]);

  const filterParties = () => {
    let seen = [];
    let uniqueParties = [];
    for (let i = 0; i < coreParties.length; i++) {
      const curParty = coreParties[i];
      if (!seen.includes(curParty.id)) {
        seen.push(curParty.id);
        uniqueParties.push(curParty);
      }
    }
    for (let i = 0; i < parties.length; i++) {
      const curParty = parties[i];
      if (!seen.includes(curParty.id)) {
        seen.push(curParty.id);
        uniqueParties.push(curParty);
      }
    }
    return uniqueParties;
  };

  useEffect(() => {
    // NativeModules.UserInfo.getPartyCount(count => {
    //   console.log("current party count: ", count);
    //   setPartyCount(count);
    // });
    // // pull parties from core data
    // NativeModules.PartyBridge.getParties(partiesRes => {
    //   console.log("parties sent to react: ", partiesRes);
    //   if (partiesRes.length > 0) {
    //     console.log("items: ", partiesRes[0].items);
    //   }
    //   setCoreParties(partiesRes);
    // });
    // firebase
    //   .database()
    //   .ref("users/" + props.userId)
    //   .on("value", snapshot => {
    //     const curParties = snapshot.val().parties;
    //     setParties(curParties);
    //   });
  }, []);

  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={() => {
        setNewParty("");
        props.close();
      }}
      overlayStyle={{ width: "80%", maxHeight: "60%" }}
    >
      <Text
        style={{
          color: "#2189DC",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10
        }}
      >
        Add to Party
      </Text>
      <ScrollView>
        {filterParties().map((party, index) => (
          <TouchableOpacity onPress={() => addToParty(index)} key={index}>
            <ListItem
              title={party.title}
              bottomDivider
              topDivider
              rightIcon={
                loadingChange === index ? (
                  <ActivityIndicator color="#2189DC" />
                ) : (
                  ""
                )
              }
            ></ListItem>
          </TouchableOpacity>
        ))}
        {/* {coreParties.map((party, index) => (
          <TouchableOpacity onPress={() => addToParty(index)} key={index}>
            <ListItem
              title={party.title}
              bottomDivider
              topDivider
              rightIcon={
                loadingChange === index ? (
                  <ActivityIndicator color="#2189DC" />
                ) : (
                  ""
                )
              }
            ></ListItem>
          </TouchableOpacity>
        ))} */}
      </ScrollView>
      <Text
        style={{
          color: "#2189DC",
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 10
        }}
      >
        Create New Party
      </Text>
      <Input
        placeholder="Ex: New-Party-Name"
        label="Name"
        onChangeText={text => setNewParty(text)}
        value={newParty}
      />
      <View>
        <Button
          onPress={createParty}
          title={creatingParty ? "" : "Create Party"}
          icon={creatingParty ? <ActivityIndicator color="#2189DC" /> : <></>}
          disabled={newParty === "" || creatingParty}
        />
      </View>
    </Overlay>
  );
};

export default Popover;

// import React, { useState, useEffect } from "react";
// import * as firebase from "firebase";
// import { ListItem, Overlay, Input, Button } from "react-native-elements";
// import { View, Text, ActivityIndicator } from "react-native";
// import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

// const Popover = props => {
//   const [parties, setParties] = useState([]);
//   const [newParty, setNewParty] = useState("");

//   const [creatingParty, setCreatingParty] = useState(false);

//   const createParty = () => {
//     setCreatingParty(true);
//   };

//   useEffect(() => {
//     if (creatingParty) {
//       const newName = newParty;
//       firebase
//         .database()
//         .ref("users/" + props.userId + "/parties")
//         .set([
//           ...parties,
//           { title: newName, items: [{ name: "head" }, props.pokeObject] }
//         ])
//         .then(() => {
//           setCreatingParty(false);
//           setNewParty("");
//           props.showToast(
//             `Created party: "${newName}" with ${props.pokeObject.name}`
//           );
//           props.close();
//         });
//     }
//   }, [creatingParty]);

//   const [loadingChange, setLoadingChange] = useState();

//   const addToParty = index => {
//     setLoadingChange(index);
//   };

//   useEffect(() => {
//     if (typeof loadingChange === "number") {
//       let newParties = parties;
//       newParties[loadingChange].items.push(props.pokeObject);
//       firebase
//         .database()
//         .ref("users/" + props.userId + "/parties")
//         .set(newParties)
//         .then(() => {
//           setLoadingChange(false);
//           props.showToast(
//             `${props.pokeObject.name} added to party: ${newParties[loadingChange].title}`
//           );
//           setNewParty("");
//           setLoadingChange();
//           props.close();
//         });
//     }
//   }, [loadingChange]);

//   useEffect(() => {
//     firebase
//       .database()
//       .ref("users/" + props.userId)
//       .on("value", snapshot => {
//         const curParties = snapshot.val().parties;
//         setParties(curParties);
//       });
//   }, []);

//   return (
//     <Overlay
//       isVisible={props.visible}
//       onBackdropPress={() => {
//         setNewParty("");
//         props.close();
//       }}
//       overlayStyle={{ width: "80%", maxHeight: "60%" }}
//     >
//       <Text
//         style={{
//           color: "#2189DC",
//           fontSize: 16,
//           fontWeight: "bold",
//           marginBottom: 10
//         }}
//       >
//         Add to Party
//       </Text>
//       <ScrollView>
//         {parties.map((party, index) => (
//           <TouchableOpacity onPress={() => addToParty(index)} key={index}>
//             <ListItem
//               title={party.title}
//               bottomDivider
//               topDivider
//               rightIcon={
//                 loadingChange === index ? (
//                   <ActivityIndicator color="#2189DC" />
//                 ) : (
//                   ""
//                 )
//               }
//             ></ListItem>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <Text
//         style={{
//           color: "#2189DC",
//           fontSize: 16,
//           fontWeight: "bold",
//           marginBottom: 10,
//           marginTop: 10
//         }}
//       >
//         Create New Party
//       </Text>
//       <Input
//         placeholder="Ex: New-Party-Name"
//         label="Name"
//         onChangeText={text => setNewParty(text)}
//         value={newParty}
//       />
//       <View>
//         <Button
//           onPress={createParty}
//           title={creatingParty ? "" : "Create Party"}
//           icon={creatingParty ? <ActivityIndicator color="#2189DC" /> : <></>}
//           disabled={newParty === "" || creatingParty}
//         />
//       </View>
//     </Overlay>
//   );
// };

// export default Popover;

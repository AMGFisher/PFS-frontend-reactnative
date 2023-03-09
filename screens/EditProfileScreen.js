import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const url = "http://2a33-194-33-45-121.ngrok.io";


function EditProfileScreen({ route }) {
  console.log(route.params.user);
  const user = route.params.user;

  const [first, setFirst] = useState(user.first_name);
  const [last, setLast] = useState(user.last_name);
  const [handle, setHandle] = useState(user.handle);

  function submitEdit() {
    console.log("hello wolrd!");

    fetch(`${url}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handle: handle,
        first_name: first,
        last_name: last
    }),
    });
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Text>Edit Profile Screen</Text>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <TextInput
        placeholder="Username"
        onChangeText={setHandle}
        value={handle}
      />
      <TextInput
        placeholder="First Name"
        onChangeText={setFirst}
        value={first}
      />
      <TextInput placeholder="Last Name" onChangeText={setLast} value={last} />

      <Ionicons.Button name="create" onPress={submitEdit}>
        Edit Profile
      </Ionicons.Button>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "black",
  },
});

import { View, Text, TextInput, Button, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const url = "http://2a33-194-33-45-121.ngrok.io";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignupScreen({ setUser, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [handle, setHandle] = useState("");

  function submit() {
    // iphone localhost:3000
    // android 10.0.2.2
    fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
        first_name: first,
        last_name: last,
        handle,
        avatar: "https://i.ibb.co/fHHH095/12532-alfredhitchcock-2.jpg",
      }),
    })
    .then((r) => r.json())
    .then((response) => {
      AsyncStorage.setItem('jwt', response.jwt)
      return response
    }).then((response) => {
      setToken(response.jwt)
      setUser(response.user)
    })
}

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={{ height: 250, width: 250 }}
      />
      <Text>Signup Screen</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={setPasswordConfirmation}
        secureTextEntry={true}
      />
      <TextInput placeholder="First Name" onChangeText={setFirst} />
      <TextInput placeholder="Last Name" onChangeText={setLast} />
      <TextInput placeholder="Username" onChangeText={setHandle} />

      <Ionicons.Button name="person-add" onPress={submit}>
        Create New Account
      </Ionicons.Button>
    </View>
  );
}

export default SignupScreen;

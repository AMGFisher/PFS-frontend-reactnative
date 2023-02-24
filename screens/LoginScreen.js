import { View, Text, TextInput, Button} from "react-native";
import { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";


function LoginScreen({setUser}) {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

function submit() {
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((r) => {
    if (r.ok) {
      r.json().then((user) => setUser(user));
      // navigate("/feed")
      console.log('success!')

    }
    else console.log("error!")
  });
}


  return (
    <View style={{alignItems: 'center'}}>
      <Text>Login Screen</Text>
      <TextInput placeholder="Email"
      onChangeText={setEmail}
      />
      <TextInput placeholder="Password"
      onChangeText={setPassword}
      secureTextEntry={true}
      />
      <Ionicons.Button name="log-in" onPress={submit}>Login</Ionicons.Button>
    </View>
  );
}

export default LoginScreen;

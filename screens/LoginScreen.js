import { View, Text, TextInput, Button, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
const url = "http://78bf-149-34-242-95.ngrok.io";
import { useNavigation } from '@react-navigation/native';


function LoginScreen({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  function submit() {
    
    // iphone localhost:3000
    // android 10.0.2.2
    
  //   axios
  //     .post("http://a84e-71-190-177-64.ngrok.io/login", {
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => setUser(response.data));
  // }

    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        console.log("success!");
      } else console.log("error!");
    });
  }


  
  return (
    <View>
    <View style={{ alignItems: "center" }}>
    <Image source={require('../assets/images/Logo.png')} 
      style={{ height: 250, width: 250}}
      />
      <Text>Login Screen</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Ionicons.Button name="log-in" onPress={submit}>
        Login
      </Ionicons.Button>
    </View>
    </View>
  );
}

export default LoginScreen;

import React, { useState } from "react";
import { Button, Image, View, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
const url = "http://0a43-212-102-35-219.ngrok.io";

export default function ImagePickerExample({token}) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const key = "e0894702a2151f4cf674e6686444438f";
  console.log(token)

  function uploadImagePost() {
    const body = new FormData();
    body.append("image", base64);

    fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${key}`, {
      body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data from imagebb", data.data.display_url);
        setImage(data.data.display_url)
        createPost(data.data.display_url)
      });
  }

  function createPost(image_url) {
    console.log("hello world", image)
    fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image_url,
        caption: caption,
        likes: 0,
        dislikes: 0
      }),
    }).then((r) => {
      if (r.ok) {
        console.log("success!");
      } else console.log("error!");
    });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setBase64(result.assets[0].base64);
      setImage(result.assets[0].uri);
    }
  };

  console.log(image);
  console.log(base64);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TextInput placeholder="Caption Your Post" onChangeText={setCaption} />

      <Button title="Post Image" onPress={uploadImagePost} />
    </View>
  );
}

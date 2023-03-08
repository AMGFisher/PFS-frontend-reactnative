import { View, Text, Button } from "react-native";
import ImagePickerExample from "../components/ImagePickerExample";

function CreatePostScreen({token}) {
console.log(token)

  return (
    <>
      <ImagePickerExample token={token} />
    </>
  );
}

export default CreatePostScreen;

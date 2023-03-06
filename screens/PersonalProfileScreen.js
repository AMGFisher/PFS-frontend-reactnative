import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
const url = "http://78bf-149-34-242-95.ngrok.io";


function PersonalProfileScreen({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${url}/personal`)
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  return (
    <View>
      <Text>Personal Profile Screen</Text>

      <View style={styles.user}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold" }}>@{user.handle}</Text>
          <Text>
            {user.first_name} {user.last_name}
          </Text>
        </View>
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        numColumns={3}
        renderItem={(itemData) => {
          return (
            <View>
              <Image
                source={{ uri: itemData.item.image }}
                style={styles.image}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

export default PersonalProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 125,
    height: 100,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});

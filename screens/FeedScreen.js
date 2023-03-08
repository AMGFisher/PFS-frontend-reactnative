import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const url = "http://0a43-212-102-35-219.ngrok.io";



function FeedScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const token = route.params.token;

  console.log(token);

  useEffect(() => {
    fetch(`${url}/feed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  console.log(posts);

  function handleLike() {
    console.log("Like!");
  }
  function handleDislike() {
    console.log("Dislike!");
  }

  return (
    <View>
      <Text>Personal Feed Screen</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        renderItem={(itemData) => {
          return (
            <View style={styles.card}>
              <View style={styles.user}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("FriendProfile", {
                      user: itemData.item.user,
                    })
                  }
                >
                  <Image
                    source={{ uri: itemData.item.user.avatar }}
                    style={styles.avatar}
                  />
                  <Text style={{ fontWeight: "bold" }}>
                    @{itemData.item.user.handle}
                  </Text>
                </Pressable>
              </View>

              <Pressable onPress={() => navigation.navigate("PostDetail")}>
                <Image
                  source={{ uri: itemData.item.image }}
                  style={styles.image}
                />
                <Text style={{ fontStyle: "italic" }}>
                  {itemData.item.caption}
                </Text>
                <Text>{itemData.item.comments.length} comments</Text>
              </Pressable>

              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <View style={styles.like}>
                  <Pressable onPress={handleLike}>
                    <Ionicons name="thumbs-up-outline" />
                    <Text>{itemData.item.likes} Likes</Text>
                  </Pressable>
                </View>

                <View style={styles.dislike}>
                  <Pressable onPress={handleDislike}>
                    <Ionicons name="thumbs-down-outline" />
                    <Text>{itemData.item.dislikes} Dislikes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  like: {
    backgroundColor: "green",
    borderRadius: 8,
    padding: 6,
  },
  dislike: {
    backgroundColor: "red",
    borderRadius: 8,
    padding: 6,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "black",
  },
});

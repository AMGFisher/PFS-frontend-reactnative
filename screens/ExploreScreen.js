import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const url = "http://0a43-212-102-35-219.ngrok.io";

function ExploreScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const token = route.params.token;

  useEffect(() => {
    loadPosts();
  }, []);


  function loadPosts() {
    fetch(`${url}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((res) => {
        setRefreshing(false);
        setPosts(res)
      })
  }


  function handleLike() {
    console.log("Like!");
  }
  function handleDislike() {
    console.log("Dislike!");
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadPosts} />
        }
        renderItem={(itemData) => {
          return (
            <View style={styles.card}>
              <Pressable
                onPress={() =>
                  navigation.navigate("FriendProfile", {
                    user: itemData.item.user,
                  })
                }
              >
                <View style={styles.user}>
                  <Image
                    source={{ uri: itemData.item.user.avatar }}
                    style={styles.avatar}
                  />
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      @{itemData.item.user.handle}
                    </Text>
                    <Text>
                      {itemData.item.user.first_name}{" "}
                      {itemData.item.user.last_name}
                    </Text>
                  </View>
                </View>
              </Pressable>

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

export default ExploreScreen;

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
    margin: 5,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
});

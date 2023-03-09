import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  RefreshControl,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
const url = "http://2a33-194-33-45-121.ngrok.io";
import { Ionicons } from "@expo/vector-icons";

function PostDetailScreen({ route, navigation }) {
  console.log(route.params);
  const token = route.params.token;
  const user = route.params.user;
  const [refreshing, setRefreshing] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([])




  const [post, setPost] = useState([]);
  
  navigation.setOptions({
    title: `@${route.params}'s Post`,
  });
  console.log(post.id)

  useEffect(() => {
    loadPost();
  }, []);

  function loadPost() {
    fetch(`${url}/posts/${route.params.post.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((res) => {
        setRefreshing(false);
        setPost(res);
        setComments(res.comments)
      });
  }

  function submitComment() {
      fetch(`${url}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          post_id: post.id,
        }),
      })
      .then((r) => r.json())
      .then((res) => {
        console.log(res)
        setComments([...comments, res])
      })
      }

  return (
    <View>
      <Text>Post Detail Screen!</Text>
      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={{ fontStyle: "italic", fontWeight: "bold" }}>
        {post.caption}
      </Text>
      {/* <Text>{post.comments.length} comments</Text> */}

      <FlatList
        keyExtractor={(item) => item.id}
        data={comments}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadPost} />
        }
        renderItem={(itemData) => {
          return (
            <View style={styles.comment}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: itemData.item.user.avatar }}
                  style={styles.avatar}
                />
                <Text>@{itemData.item.user.handle}</Text>
              </View>
              <Text>{itemData.item.content}</Text>
            </View>
          );
        }}
      />
      <View style={styles.commentInput}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text>@{user.handle}</Text>
        </View>
        <TextInput placeholder="Comment..." onChangeText={setComment} />
        <Pressable onPress={submitComment}>
          <Ionicons name="paper-plane-outline" />
        </Pressable>
      </View>
    </View>
  );
}

export default PostDetailScreen;

const styles = StyleSheet.create({
  commentInput: {
    backgroundColor: "orange",
    margin: 2,
    padding: 3,
    borderRadius: 10,
  },
  comment: {
    margin: 2,
    padding: 3,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "lightblue",
  },
  image: {
    width: "95%",
    height: 350,
    borderRadius: 10,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "black",
  },
});

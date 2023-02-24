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

function FeedScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  console.log(posts);

function handleLike() {
  console.log('Like!')
}
function handleDislike() {
  console.log('Dislike!')
}

  return (
    <View>
      <Text>Personal Feed Screen</Text>
      <FlatList
        data={posts}
        renderItem={(itemData) => {
          return (
            <View style={styles.card}>
              <View style={styles.user}>
                <Image
                  source={{ uri: itemData.item.user.avatar }}
                  style={styles.avatar}
                />
                <Text style={{ fontWeight: "bold" }}>
                  @{itemData.item.user.handle}
                </Text>
              </View>
              <Image
                source={{ uri: itemData.item.image }}
                style={styles.image}
              />
              <Text style={{fontStyle: 'italic'}}>{itemData.item.caption}</Text>

              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>

              <View style={styles.like}>
                <Pressable onPress={handleLike}>
                <Ionicons name="thumbs-up-outline"/>
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
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 6,
  },
  dislike: {
    backgroundColor: 'red',
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
    borderColor: 'black'
  },
});

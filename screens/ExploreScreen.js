import { Text, FlatList, View, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";


function ExploreScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  console.log(posts);

  return (
    <View>
      <Text>Explore Screen</Text>
      <FlatList
        data={posts}
        renderItem={(itemData) => {
          return (
            <View style={styles.card}>
                <View style={styles.user}>
                <Image source={{uri: itemData.item.user.avatar}} style={styles.avatar} />
                <Text style={{fontWeight: 'bold'}}>@{itemData.item.user.handle}</Text>
                </View>
              <Image source={{uri: itemData.item.image}} style={styles.image} />
              <Text>{itemData.item.caption}</Text>
              <Text>{itemData.item.likes} Likes</Text>
              <Text>{itemData.item.dislikes} Dislikes</Text>


            </View>
          );
        }}
      />
    </View>
  );
}

export default ExploreScreen;

const styles = StyleSheet.create({
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    card: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        borderRadius: 10, 
        padding: 10
    },
image: {
    width: "100%",
    height: 400,
    borderRadius: 10
},
avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
}
})
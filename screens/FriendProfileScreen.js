import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
const url = "http://2a33-194-33-45-121.ngrok.io";

function FriendProfileScreen({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(true);

  navigation.setOptions({
    title: `@${route.params.user.handle}`,
  });

  console.log(route.params.user);
  const token = route.params.token

  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);


   function loadUser() {
    fetch(`${url}/users/${route.params.user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((res) => {
        setRefreshing(false);
        setUser(res)
      })
   } 




  console.log(user.posts);

  return (
    <View>
      <View style={styles.user}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold" }}>@{user.handle}</Text>
          <Text>
            {user.first_name} {user.last_name}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={user.posts}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUser} />
        }
        numColumns={3}
        renderItem={(itemData) => {
          return (
            <View style={{margin: 1}}>
              <Pressable
                onPress={() =>
                  navigation.navigate("PostDetail", {
                    post: itemData.item,
                  })
                }
              >
                <Image
                  source={{ uri: itemData.item.image }}
                  style={styles.image}
                />
              </Pressable>
            </View>
          );
        }}
      />
      </View>
    </View>
  );
}

export default FriendProfileScreen;

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

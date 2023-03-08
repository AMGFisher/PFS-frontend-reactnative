import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
const url = "http://0a43-212-102-35-219.ngrok.io";


function PersonalProfileScreen({ route, navigation }) {
  const [user, setUser] = useState([]);
  
  console.log(route.params)

  const token = route.params.token

  useEffect(() => {
    fetch(`${url}/users/${route.params.user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(setUser);
  }, []);

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

    // <View>
    //   <View style={styles.user}>
    //     <Image source={{ uri: user.avatar }} style={styles.avatar} />
    //     <View style={{ flexDirection: "column" }}>
    //       <Text style={{ fontWeight: "bold" }}>@{user.handle}</Text>
    //       <Text>
    //         {user.first_name} {user.last_name}
    //       </Text>
    //     </View>
    //   </View>

    //   <FlatList
    //     keyExtractor={(item) => item.id}
    //     data={posts}
    //     numColumns={3}
    //     renderItem={(itemData) => {
    //       return (
    //         <View>
    //           <Image
    //             source={{ uri: itemData.item.image }}
    //             style={styles.image}
    //           />
    //         </View>
    //       );
    //     }}
    //   />
    // </View>
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

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePostScreen from "./screens/CreatePostScreen";
import ExploreScreen from "./screens/ExploreScreen";
import FeedScreen from "./screens/FeedScreen";
import PersonalProfileScreen from "./screens/PersonalProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { useState, useEffect } from "react";
import FriendProfileScreen from "./screens/FriendProfileScreen";
import PostDetailScreen from "./screens/PostDetailScreen";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";
const url = "http://78bf-149-34-242-95.ngrok.io";
import EditProfileScreen from "./screens/EditProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${url}/me`).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogout() {
    fetch(`${url}/logout`, { method: "DELETE" }).then((r) => {
      alert("Logged out successfully!");
      setUser(null);
    });
  }

  function ExploreStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Explore All" component={ExploreScreen} />
        <Stack.Screen name="FriendProfile" component={FriendProfileScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    );
  }

  function FeedStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Personal Feed" component={FeedScreen} />
        <Stack.Screen name="FriendProfile" component={FriendProfileScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Personal Profile"
        >
                      {() => <PersonalProfileScreen user={user} />}
            </Stack.Screen>
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      </Stack.Navigator>
    );
  }

  const scheme = useColorScheme();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        {user ? (
          <Tab.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "orange" },
              tabBarStyle: { backgroundColor: "lightblue" },
            }}
          >
            <Tab.Screen
              name="Explore All"
              component={ExploreStack}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="globe" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Personal Feed"
              component={FeedStack}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Create Post"
              component={CreatePostScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="add-circle-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <Button onPress={() => navigation.navigate('Edit Profile', { user: user })} title="Edit" />
                ),
                headerRight: () => (
                  <Button onPress={() => handleLogout()} title="Logout" />
                ),
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-circle" color={color} size={size} />
                ),
              })}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "orange" },
              contentStyle: { backgroundColor: "lightblue" },
            }}
          >
            <Stack.Screen
              name={"Login"}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Button
                    title="Sign Up"
                    onPress={() => navigation.navigate("Signup")}
                  />
                ),
              })}
            >
              {() => <LoginScreen setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name={"Signup"}>
              {() => <SignupScreen setUser={setUser} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});

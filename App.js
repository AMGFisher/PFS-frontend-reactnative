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
const url = "http://2a33-194-33-45-121.ngrok.io";
import EditProfileScreen from "./screens/EditProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("jwt").then((token) => {
      if (typeof token !== "undefined" && token !== null && token.length > 1) {
        fetch(`${url}/auto_login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setUser(res.user);
            setToken(res.token);
          });
      } else {
        console.log("No token found, try logging in!");
      }
    });
  }, []);

  function handleLogout() {
    AsyncStorage.setItem("jwt", "").then(() => {
      setUser(null);
      setToken(null);
      alert("Logged out successfully");
    });
  }

  //   fetch(`${url}/logout`, { method: "DELETE" }).then((r) => {
  //     alert("Logged out successfully!");
  //     setUser(null);
  //   });
  // }

  function ExploreStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "orange" },
        }}
      >
        <Stack.Screen
          name="Explore All"
          component={ExploreScreen}
          initialParams={{ token: token }}
        />
        <Stack.Screen
          name="FriendProfile"
          component={FriendProfileScreen}
          initialParams={{ token: token }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          initialParams={{ token: token, user: user }}
        />
      </Stack.Navigator>
    );
  }

  function FeedStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "orange" },
        }}
      >
        <Stack.Screen
          name="Personal Feed"
          component={FeedScreen}
          initialParams={{ token: token }}
        />
        <Stack.Screen
          name="FriendProfile"
          component={FriendProfileScreen}
          initialParams={{ token: token }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          initialParams={{ token: token }}
        />
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          headerStyle: { backgroundColor: "orange" },
        }}
      >
        <Stack.Screen
          name="Personal Profile"
          component={PersonalProfileScreen}
          initialParams={{ token: token, user: user }}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                onPress={() =>
                  navigation.navigate("Edit Profile", { user: user })
                }
                title="Edit"
              />
            ),
            headerRight: () => (
              <Button onPress={() => handleLogout()} title="Logout" />
            ),
          })}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          initialParams={{ token: token }}
        />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
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
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="globe" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Personal Feed"
              component={FeedStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Create Post"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="add-circle-outline"
                    color={color}
                    size={size}
                  />
                ),
              }}
            >
              {() => <CreatePostScreen token={token} />}
            </Tab.Screen>

            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-circle" color={color} size={size} />
                ),
              }}
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
              {() => <LoginScreen setUser={setUser} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name={"Signup"}>
              {() => <SignupScreen setUser={setUser} setToken={setToken} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});

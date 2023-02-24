import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePostScreen from "./screens/CreatePostScreen";
import ExploreScreen from "./screens/ExploreScreen";
import FeedScreen from "./screens/FeedScreen";
import PersonalProfileScreen from "./screens/PersonalProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3000/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, [user]);

  console.log(user);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "orange" },
            tabBarStyle: { backgroundColor: "lightblue" },
          }}
        >
          <Tab.Screen
            name="Personal Feed"
            component={FeedScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Explore All"
            component={ExploreScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="globe" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Create Post"
            component={CreatePostScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="create" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={PersonalProfileScreen}
            initialParams={{ setUser: { setUser } }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-circle" color={color} size={size} />
              ),
            }}
          />
          {user ? (
            <Tab.Screen
              name={`${user.first_name} ${user.last_name}`}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="log-in" color={color} size={size} />
                ),
              }}
            >
              {() => <LoginScreen setUser={setUser} />}
            </Tab.Screen>
          ) : (
            <Tab.Screen
              name={"Login"}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="log-in" color={color} size={size} />
                ),
              }}
            >
              {() => <LoginScreen setUser={setUser} />}
            </Tab.Screen>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});

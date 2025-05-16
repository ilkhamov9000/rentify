import React from "react";
import { Tabs } from "expo-router";
import Theme from "@/constants/theme";

// Import icons from the main package
import { Home, Search, Heart, MessageSquare, User } from 'lucide-react-native';

function TabBarIcon(props: {
  icon: React.ElementType;
  color: string;
}) {
  const Icon = props.icon;
  return <Icon size={24} color={props.color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary.main,
        tabBarInactiveTintColor: Theme.colors.neutral.darkGray,
        tabBarStyle: {
          backgroundColor: Theme.colors.neutral.white,
          borderTopColor: Theme.colors.neutral.lightGray,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: Theme.colors.neutral.white,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: Theme.colors.neutral.black,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={Home} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={Search} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={Heart} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={MessageSquare} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={User} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
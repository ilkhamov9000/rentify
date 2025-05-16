import React from "react";
import { Stack } from "expo-router";
import Theme from "@/constants/theme";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.neutral.white,
        },
        headerTintColor: Theme.colors.primary.main,
        headerTitleStyle: {
          fontWeight: Theme.typography.weights.semibold,
        },
        contentStyle: {
          backgroundColor: Theme.colors.neutral.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-property"
        options={{
          title: "Add Property",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="my-properties"
        options={{
          title: "My Properties",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
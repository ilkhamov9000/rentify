import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";

import { ErrorBoundary } from "./error-boundary";
import Theme from "@/constants/theme";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="property/[id]" 
        options={{ 
          title: "Property Details",
          headerTransparent: true,
          headerTintColor: Theme.colors.neutral.white,
          headerBackVisible: true,
        }} 
      />
      <Stack.Screen 
        name="auth/login" 
        options={{ 
          title: "Login",
          headerShown: true,
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="auth/register" 
        options={{ 
          title: "Register",
          headerShown: true,
          presentation: "modal",
        }} 
      />
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: "modal",
          title: "Filters",
        }} 
      />
      <Stack.Screen 
        name="map" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}
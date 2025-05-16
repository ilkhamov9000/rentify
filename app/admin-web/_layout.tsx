import React from "react";
import { Platform, StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Stack, usePathname, useRouter } from "expo-router";
import Theme from "@/constants/theme";
import useAuthStore from "@/store/auth";

// Import icons from the main package
import { LayoutDashboard, Home, Users, LogOut, ChevronRight, Shield } from 'lucide-react-native';

export default function AdminWebLayout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  
  // Check if user is authenticated and has admin role
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Admin Login",
            headerStyle: {
              backgroundColor: Theme.colors.primary.main,
            },
            headerTintColor: Theme.colors.neutral.white,
          }} 
        />
      </Stack>
    );
  }
  
  // Navigation items for the sidebar
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin-web",
      icon: pathname === "/admin-web" ? (
        <LayoutDashboard size={24} color={Theme.colors.primary.main} />
      ) : (
        <LayoutDashboard size={24} color={Theme.colors.neutral.darkGray} />
      ),
    },
    {
      name: "Properties",
      path: "/admin-web/properties",
      icon: pathname === "/admin-web/properties" ? (
        <Home size={24} color={Theme.colors.primary.main} />
      ) : (
        <Home size={24} color={Theme.colors.neutral.darkGray} />
      ),
    },
    {
      name: "Users",
      path: "/admin-web/users",
      icon: pathname === "/admin-web/users" ? (
        <Users size={24} color={Theme.colors.primary.main} />
      ) : (
        <Users size={24} color={Theme.colors.neutral.darkGray} />
      ),
    },
  ];
  
  // Only show sidebar on web
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Shield size={32} color={Theme.colors.primary.main} />
            <Text style={styles.sidebarTitle}>Rentify Admin</Text>
          </View>
          
          <View style={styles.navContainer}>
            {navItems.map((item) => (
              <Pressable
                key={item.path}
                style={[
                  styles.navItem,
                  pathname === item.path && styles.navItemActive,
                ]}
                onPress={() => router.push(item.path)}
              >
                {item.icon}
                <Text
                  style={[
                    styles.navText,
                    pathname === item.path && styles.navTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
          
          <Pressable
            style={styles.logoutButton}
            onPress={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut size={24} color={Theme.colors.status.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
        
        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: Theme.colors.neutral.white,
              },
              headerTintColor: Theme.colors.primary.main,
              headerShadowVisible: false,
              headerBackTitle: "Back",
            }}
          />
        </View>
      </View>
    );
  }
  
  // On mobile, use a regular stack layout with a custom header
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.primary.main,
        },
        headerTintColor: Theme.colors.neutral.white,
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Admin Dashboard",
          headerRight: () => (
            <Pressable
              onPress={() => {
                logout();
                router.push("/");
              }}
              style={({ pressed }) => [
                styles.mobileLogoutButton,
                pressed && { opacity: 0.7 },
              ]}
            >
              <LogOut size={24} color={Theme.colors.neutral.white} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="properties"
        options={{
          title: "Manage Properties",
        }}
      />
      <Stack.Screen
        name="property-details"
        options={{
          title: "Property Details",
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: "Manage Users",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Theme.colors.neutral.background,
  },
  sidebar: {
    width: 250,
    backgroundColor: Theme.colors.neutral.white,
    borderRightWidth: 1,
    borderRightColor: Theme.colors.neutral.lightGray,
    padding: Theme.spacing.md,
    paddingTop: Theme.spacing.xl,
    justifyContent: "space-between",
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.md,
  },
  sidebarTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: 700,
    color: Theme.colors.primary.main,
    marginLeft: Theme.spacing.md,
  },
  navContainer: {
    flex: 1,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.sm,
  },
  navItemActive: {
    backgroundColor: Theme.colors.primary.light,
  },
  navText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.md,
  },
  navTextActive: {
    color: Theme.colors.primary.main,
    fontWeight: 600,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral.lightGray,
    marginTop: Theme.spacing.md,
  },
  logoutText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.status.error,
    marginLeft: Theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  mobileLogoutButton: {
    marginRight: Theme.spacing.md,
  },
});
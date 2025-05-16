import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { 
  User, 
  Settings, 
  Heart, 
  MessageSquare, 
  Home, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Plus
} from "lucide-react-native";
import Theme from "@/constants/theme";
import useAuthStore from "@/store/auth";
import Button from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { t } = useTranslation();
  
  const handleLogout = () => {
    Alert.alert(
      t("common.logout"),
      t("common.confirm") + "?",
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.logout"),
          onPress: () => {
            logout();
          },
          style: "destructive",
        },
      ]
    );
  };
  
  const menuItems = [
    {
      id: "favorites",
      title: t("profile.myFavorites"),
      icon: <Heart size={22} color={Theme.colors.primary.main} />,
      onPress: () => router.push("/favorites"),
    },
    {
      id: "messages",
      title: t("chat.messages"),
      icon: <MessageSquare size={22} color={Theme.colors.primary.main} />,
      onPress: () => router.push("/chat"),
    },
    {
      id: "properties",
      title: t("profile.myProperties"),
      icon: <Home size={22} color={Theme.colors.primary.main} />,
      onPress: () => router.push("/profile/my-properties"),
    },
    {
      id: "settings",
      title: t("profile.settings"),
      icon: <Settings size={22} color={Theme.colors.primary.main} />,
      onPress: () => router.push("/profile/settings"),
    },
    {
      id: "help",
      title: t("profile.helpAndSupport"),
      icon: <HelpCircle size={22} color={Theme.colors.primary.main} />,
      onPress: () => {
        // In a real app, navigate to help page
        console.log("Navigate to help");
      },
    },
  ];

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <User size={60} color={Theme.colors.neutral.lightGray} />
        <Text style={styles.authTitle}>{t("auth.signInToAccess")}</Text>
        <Text style={styles.authText}>
          {t("auth.signInToAccess")} {t("profile.myProfile").toLowerCase()}.
        </Text>
        <Button
          title={t("auth.signIn")}
          onPress={() => router.push("/auth/login")}
          style={styles.signInButton}
        />
        <Button
          title={t("auth.signUp")}
          variant="outline"
          onPress={() => router.push("/auth/register")}
          style={styles.createAccountButton}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || "User"}</Text>
            <Text style={styles.userEmail}>{user?.email || "user@example.com"}</Text>
          </View>
        </View>
        <Button
          title={t("profile.editProfile")}
          variant="outline"
          size="small"
          onPress={() => {
            // In a real app, navigate to edit profile page
            console.log("Navigate to edit profile");
          }}
        />
      </View>
      
      <Pressable 
        style={styles.addPropertyButton}
        onPress={() => router.push("/profile/add-property")}
      >
        <Plus size={20} color={Theme.colors.neutral.white} />
        <Text style={styles.addPropertyText}>{t("property.addNew")}</Text>
      </Pressable>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <Pressable
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemContent}>
              {item.icon}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <ChevronRight size={20} color={Theme.colors.neutral.darkGray} />
          </Pressable>
        ))}
        
        <Pressable
          style={[styles.menuItem, styles.logoutItem]}
          onPress={handleLogout}
        >
          <View style={styles.menuItemContent}>
            <LogOut size={22} color={Theme.colors.status.error} />
            <Text style={[styles.menuItemText, styles.logoutText]}>{t("common.logout")}</Text>
          </View>
        </Pressable>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Rentify v1.0.0</Text>
        <Text style={styles.footerText}>© 2023 Rentify. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  header: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Theme.spacing.md,
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  addPropertyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.primary.main,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  addPropertyText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    marginLeft: Theme.spacing.sm,
  },
  menuContainer: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
    marginLeft: Theme.spacing.md,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: Theme.colors.status.error,
  },
  footer: {
    alignItems: "center",
    padding: Theme.spacing.lg,
  },
  footerText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginBottom: Theme.spacing.xs,
  },
  authContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
  },
  authTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginVertical: Theme.spacing.md,
  },
  authText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
  },
  signInButton: {
    marginBottom: Theme.spacing.md,
    width: "100%",
  },
  createAccountButton: {
    width: "100%",
  },
});
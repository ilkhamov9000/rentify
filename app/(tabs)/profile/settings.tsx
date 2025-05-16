import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Switch, 
  Pressable, 
  Alert 
} from "react-native";
import { useRouter } from "expo-router";
import { 
  Bell, 
  Globe, 
  Moon, 
  Shield, 
  HelpCircle, 
  Info, 
  LogOut 
} from "lucide-react-native";
import Theme from "@/constants/theme";
import useAuthStore from "@/store/auth";
import useLanguageStore, { Language } from "@/store/language";
import { useTranslation } from "@/hooks/useTranslation";

export default function SettingsScreen() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>{t("auth.signInToAccess")}</Text>
        <Text style={styles.authText}>
          {t("auth.signInToAccess")} {t("profile.settings").toLowerCase()}.
        </Text>
        <Pressable
          style={styles.authButton}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.authButtonText}>{t("auth.signIn")}</Text>
        </Pressable>
      </View>
    );
  }
  
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
            router.replace("/(tabs)");
          },
          style: "destructive",
        },
      ]
    );
  };
  
  const handleLanguageChange = () => {
    Alert.alert(
      t("settings.language"),
      t("common.select") + " " + t("settings.language").toLowerCase(),
      [
        {
          text: t("settings.english"),
          onPress: () => setLanguage("en"),
        },
        {
          text: t("settings.russian"),
          onPress: () => setLanguage("ru"),
        },
        {
          text: t("settings.uzbek"),
          onPress: () => setLanguage("uz"),
        },
        {
          text: t("common.cancel"),
          style: "cancel",
        },
      ]
    );
  };
  
  const getLanguageText = () => {
    switch (language) {
      case "en":
        return t("settings.english");
      case "ru":
        return t("settings.russian");
      case "uz":
        return t("settings.uzbek");
      default:
        return t("settings.english");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("settings.preferences")}</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={22} color={Theme.colors.primary.main} />
            <Text style={styles.settingText}>{t("settings.notifications")}</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ 
              false: Theme.colors.neutral.lightGray, 
              true: Theme.colors.primary.light 
            }}
            thumbColor={
              notificationsEnabled 
                ? Theme.colors.primary.main 
                : Theme.colors.neutral.white
            }
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Moon size={22} color={Theme.colors.primary.main} />
            <Text style={styles.settingText}>{t("settings.darkMode")}</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ 
              false: Theme.colors.neutral.lightGray, 
              true: Theme.colors.primary.light 
            }}
            thumbColor={
              darkModeEnabled 
                ? Theme.colors.primary.main 
                : Theme.colors.neutral.white
            }
          />
        </View>
        
        <Pressable 
          style={styles.settingItem}
          onPress={handleLanguageChange}
        >
          <View style={styles.settingInfo}>
            <Globe size={22} color={Theme.colors.primary.main} />
            <Text style={styles.settingText}>{t("settings.language")}</Text>
          </View>
          <View style={styles.settingValue}>
            <Text style={styles.settingValueText}>{getLanguageText()}</Text>
          </View>
        </Pressable>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("settings.support")}</Text>
        
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={22} color={Theme.colors.primary.main} />
            <Text style={styles.settingText}>{t("settings.helpCenter")}</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={22} color={Theme.colors.primary.main} />
            <Text style={styles.settingText}>{t("settings.privacyPolicy")}</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Info size={22} color={Theme.colors.primary.main} />
            <Text style={styles.settingText}>{t("settings.termsOfService")}</Text>
          </View>
        </Pressable>
      </View>
      
      <Pressable 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <LogOut size={22} color={Theme.colors.neutral.white} />
        <Text style={styles.logoutText}>{t("common.logout")}</Text>
      </Pressable>
      
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
  section: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    margin: Theme.spacing.md,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
    marginLeft: Theme.spacing.md,
  },
  settingValue: {
    backgroundColor: Theme.colors.neutral.background,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  settingValueText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.status.error,
    margin: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  logoutText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    marginLeft: Theme.spacing.sm,
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
    marginBottom: Theme.spacing.md,
  },
  authText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
  },
  authButton: {
    backgroundColor: Theme.colors.primary.main,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
  },
  authButtonText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
  },
});
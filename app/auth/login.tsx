import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import Theme from "@/constants/theme";
import Button from "@/components/Button";
import useAuthStore from "@/store/auth";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      // Error is handled by the store
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to access your account
          </Text>
        </View>
        
        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
              />
              <Pressable
                onPress={togglePasswordVisibility}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOff size={20} color={Theme.colors.neutral.darkGray} />
                ) : (
                  <Eye size={20} color={Theme.colors.neutral.darkGray} />
                )}
              </Pressable>
            </View>
          </View>
          
          <Pressable style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>
          
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            style={styles.loginButton}
          />
          
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>
          
          <Button
            title="Continue as Guest"
            variant="outline"
            onPress={() => router.replace("/(tabs)")}
            fullWidth
            style={styles.guestButton}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/auth/register")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Theme.spacing.lg,
  },
  header: {
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.typography.sizes.xxxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
  },
  form: {
    marginBottom: Theme.spacing.xl,
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
  },
  errorText: {
    color: Theme.colors.status.error,
    fontSize: Theme.typography.sizes.sm,
  },
  inputContainer: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.medium,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
  },
  eyeButton: {
    padding: Theme.spacing.xs,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: Theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.primary.main,
    fontWeight: Theme.typography.weights.medium,
  },
  loginButton: {
    marginBottom: Theme.spacing.md,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Theme.spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.neutral.lightGray,
  },
  dividerText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginHorizontal: Theme.spacing.md,
  },
  guestButton: {
    marginTop: Theme.spacing.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  footerText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginRight: Theme.spacing.xs,
  },
  signUpText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.primary.main,
    fontWeight: Theme.typography.weights.semibold,
  },
});
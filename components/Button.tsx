import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import Theme from "@/constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "text" | "filled";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  iconPosition = "left",
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButton;
      case "secondary":
        return styles.secondaryButton;
      case "outline":
        return styles.outlineButton;
      case "text":
        return styles.textButton;
      case "filled":
        return styles.primaryButton; // Use primary style for filled
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
      case "secondary":
      case "filled":
        return styles.lightText;
      case "outline":
        return styles.primaryText;
      case "text":
        return styles.primaryText;
      default:
        return styles.lightText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallButton;
      case "medium":
        return styles.mediumButton;
      case "large":
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallText;
      case "medium":
        return styles.mediumText;
      case "large":
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "text"
              ? Theme.colors.primary.main
              : Theme.colors.neutral.white
          }
        />
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <Text
            style={[
              styles.text,
              getTextStyle(),
              getTextSizeStyle(),
              disabled && styles.disabledText,
              icon && iconPosition === "left" && { marginLeft: 8 },
              icon && iconPosition === "right" && { marginRight: 8 },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Theme.borderRadius.md,
  },
  primaryButton: {
    backgroundColor: Theme.colors.primary.main,
    borderWidth: 1,
    borderColor: Theme.colors.primary.main,
  },
  secondaryButton: {
    backgroundColor: Theme.colors.secondary.main,
    borderWidth: 1,
    borderColor: Theme.colors.secondary.main,
  },
  outlineButton: {
    backgroundColor: Theme.colors.transparent,
    borderWidth: 1,
    borderColor: Theme.colors.primary.main,
  },
  textButton: {
    backgroundColor: Theme.colors.transparent,
    borderWidth: 0,
  },
  disabledButton: {
    backgroundColor: Theme.colors.neutral.lightGray,
    borderColor: Theme.colors.neutral.lightGray,
    opacity: 0.7,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
  },
  lightText: {
    color: Theme.colors.neutral.white,
  },
  primaryText: {
    color: Theme.colors.primary.main,
  },
  disabledText: {
    color: Theme.colors.neutral.darkGray,
  },
  smallText: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: 500,
  },
  mediumText: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: 500,
  },
  largeText: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: 500,
  },
});

export default Button;
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import Theme from "@/constants/theme";

interface CustomSliderProps {
  value: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: any;
}

// Web implementation of slider
const WebSlider = (props: CustomSliderProps) => {
  const {
    value,
    minimumValue = 0,
    maximumValue = 1,
    step = 0.1,
    onValueChange,
    minimumTrackTintColor = Theme.colors.primary.main,
    maximumTrackTintColor = Theme.colors.neutral.lightGray,
    thumbTintColor = Theme.colors.primary.main,
    style,
  } = props;

  return (
    <input
      type="range"
      min={minimumValue}
      max={maximumValue}
      step={step}
      value={value}
      onChange={(e) => {
        if (onValueChange) {
          onValueChange(parseFloat(e.target.value));
        }
      }}
      style={{
        ...styles.webSlider,
        ...style,
      }}
      className="custom-slider"
    />
  );
};

// Create a platform-specific slider component
const CustomSlider = (props: CustomSliderProps) => {
  // Use the native slider on mobile platforms
  if (Platform.OS !== "web") {
    return <Slider {...props} />;
  }

  // Use our custom web implementation on web
  return <WebSlider {...props} />;
};

const styles = StyleSheet.create({
  webSlider: {
    width: "100%",
    height: 40,
    // Basic styling for the web slider
    appearance: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
});

// Add CSS for styling the web slider
if (Platform.OS === "web") {
  // Add CSS to style the web range input
  const style = document.createElement("style");
  style.textContent = `
    .custom-slider {
      -webkit-appearance: none;
      height: 4px;
      border-radius: 2px;
      background: ${Theme.colors.neutral.lightGray};
      outline: none;
    }
    
    .custom-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${Theme.colors.primary.main};
      cursor: pointer;
    }
    
    .custom-slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${Theme.colors.primary.main};
      cursor: pointer;
      border: none;
    }
    
    .custom-slider::-ms-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${Theme.colors.primary.main};
      cursor: pointer;
    }
    
    .custom-slider::-webkit-slider-runnable-track {
      height: 4px;
      border-radius: 2px;
    }
    
    .custom-slider::-moz-range-track {
      height: 4px;
      border-radius: 2px;
      background: ${Theme.colors.neutral.lightGray};
    }
    
    .custom-slider::-ms-track {
      height: 4px;
      border-radius: 2px;
      background: ${Theme.colors.neutral.lightGray};
    }
  `;
  document.head.appendChild(style);
}

export default CustomSlider;
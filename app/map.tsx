import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import * as Location from "expo-location";
import { properties } from "@/mocks/properties";
import Theme from "@/constants/theme";
import Button from "@/components/Button";

// Web fallback component since expo-location is not fully supported on web
const MapFallback = () => {
  const router = useRouter();
  
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackTitle}>Map View</Text>
      <Text style={styles.fallbackText}>
        The map view is not available on web. Please use the mobile app to access this feature.
      </Text>
      <Button
        title="Go Back"
        onPress={() => router.back()}
        style={styles.fallbackButton}
      />
    </View>
  );
};

export default function MapScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Web fallback
  if (Platform.OS === "web") {
    return <MapFallback />;
  }
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            title="Back"
            variant="text"
            icon={<ArrowLeft size={24} color={Theme.colors.primary.main} />}
            iconPosition="left"
            onPress={() => router.back()}
          />
          <Text style={styles.headerTitle}>Map View</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Location Error</Text>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={styles.errorButton}
          />
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Back"
          variant="text"
          icon={<ArrowLeft size={24} color={Theme.colors.primary.main} />}
          iconPosition="left"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Map View</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>
          Map would display here with property locations.
        </Text>
        <Text style={styles.mapInfo}>
          {location ? `Current location: ${location.coords.latitude}, ${location.coords.longitude}` : "Getting location..."}
        </Text>
        <Text style={styles.mapInfo}>
          Properties nearby: {properties.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  headerTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8EAF6",
  },
  mapPlaceholder: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.medium,
    color: Theme.colors.neutral.darkGray,
    marginBottom: Theme.spacing.md,
  },
  mapInfo: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginBottom: Theme.spacing.sm,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
  },
  errorTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.md,
  },
  errorText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
  },
  errorButton: {
    width: "50%",
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
    backgroundColor: Theme.colors.neutral.background,
  },
  fallbackTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.md,
  },
  fallbackText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
  },
  fallbackButton: {
    width: "50%",
  },
});
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Theme from "@/constants/theme";
import FilterBar from "@/components/FilterBar";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, getFeaturedProperties } from "@/mocks/properties";

// Import icons from the main package
import { MapPin, Map } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const featuredProperties = getFeaturedProperties();
  
  const handleFilterPress = () => {
    router.push("/modal");
  };
  
  const handleSearchPress = () => {
    router.push("/search");
  };
  
  const handleMapPress = () => {
    router.push("/map");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, John</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Theme.colors.primary.main} />
            <Text style={styles.locationText}>New York, USA</Text>
          </View>
        </View>
        <Pressable onPress={() => router.push("/profile")}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" }}
            style={styles.avatar}
          />
        </Pressable>
      </View>
      
      <FilterBar onFilterPress={handleFilterPress} onSearchPress={handleSearchPress} />
      
      <Pressable 
        style={styles.mapButton}
        onPress={handleMapPress}
      >
        <Map size={20} color={Theme.colors.primary.main} />
        <Text style={styles.mapButtonText}>View Properties on Map</Text>
      </Pressable>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Properties</Text>
          <Pressable onPress={() => router.push("/search")}>
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContainer}
        >
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              horizontal
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Properties</Text>
          <Pressable onPress={() => router.push("/search")}>
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>
        
        <View style={styles.propertiesContainer}>
          {properties.slice(0, 4).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.neutral.white,
  },
  welcomeText: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: "700",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.xs,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.neutral.white,
    marginHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.primary.main,
  },
  mapButtonText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.primary.main,
    fontWeight: "500",
    marginLeft: Theme.spacing.sm,
  },
  section: {
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: 700,
    color: Theme.colors.neutral.black,
  },
  seeAllText: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: 500,
    color: Theme.colors.primary.main,
  },
  featuredContainer: {
    paddingRight: Theme.spacing.md,
  },
  propertiesContainer: {
    marginBottom: Theme.spacing.lg,
  },
});
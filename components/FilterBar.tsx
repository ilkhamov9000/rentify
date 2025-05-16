import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Theme from "@/constants/theme";

// Import icons from the main package
import { Search, SlidersHorizontal } from 'lucide-react-native';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  onFilterPress: () => void;
  onSearchPress: () => void;
}

const propertyTypes: FilterOption[] = [
  { id: "all", label: "All" },
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "villa", label: "Villa" },
  { id: "office", label: "Office" },
  { id: "commercial", label: "Commercial" },
  { id: "land", label: "Land" },
];

export default function FilterBar({ onFilterPress, onSearchPress }: FilterBarProps) {
  const [selectedType, setSelectedType] = useState("all");

  const handleTypePress = (id: string) => {
    setSelectedType(id);
    // In a real app, you would filter properties based on the selected type
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchBar} onPress={onSearchPress}>
          <Search size={20} color={Theme.colors.neutral.darkGray} />
          <Text style={styles.searchText}>Search for properties...</Text>
        </Pressable>
        
        <Pressable style={styles.filterButton} onPress={onFilterPress}>
          <SlidersHorizontal size={20} color={Theme.colors.neutral.white} />
        </Pressable>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typesContainer}
      >
        {propertyTypes.map((type) => (
          <Pressable
            key={type.id}
            style={[
              styles.typeButton,
              selectedType === type.id && styles.selectedTypeButton,
            ]}
            onPress={() => handleTypePress(type.id)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === type.id && styles.selectedTypeText,
              ]}
            >
              {type.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.neutral.white,
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginRight: Theme.spacing.sm,
  },
  searchText: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    color: Theme.colors.neutral.darkGray,
    fontSize: Theme.typography.sizes.md,
  },
  filterButton: {
    backgroundColor: Theme.colors.primary.main,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  typesContainer: {
    paddingRight: Theme.spacing.md,
  },
  typeButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.neutral.background,
    marginRight: Theme.spacing.sm,
  },
  selectedTypeButton: {
    backgroundColor: Theme.colors.primary.main,
  },
  typeText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  selectedTypeText: {
    color: Theme.colors.neutral.white,
    fontWeight: 500,
  },
});
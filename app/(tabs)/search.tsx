import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from "react-native";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react-native";
import { useRouter } from "expo-router";
import Theme from "@/constants/theme";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/mocks/properties";
import { Property } from "@/types/property";

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === "") {
      setFilteredProperties(properties);
      return;
    }
    
    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(text.toLowerCase()) ||
        property.location.city.toLowerCase().includes(text.toLowerCase()) ||
        property.location.district.toLowerCase().includes(text.toLowerCase()) ||
        property.type.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredProperties(filtered);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProperties(properties);
  };
  
  const handleFilterPress = () => {
    router.push("/modal");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color={Theme.colors.neutral.darkGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for properties..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={Theme.colors.neutral.darkGray}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch} hitSlop={10}>
              <X size={20} color={Theme.colors.neutral.darkGray} />
            </Pressable>
          )}
        </View>
        
        <Pressable style={styles.filterButton} onPress={handleFilterPress}>
          <SlidersHorizontal size={20} color={Theme.colors.neutral.white} />
        </Pressable>
      </View>
      
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PropertyCard property={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No properties found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filters to find what you're looking for.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.neutral.white,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
  },
  filterButton: {
    backgroundColor: Theme.colors.primary.main,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    padding: Theme.spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
    marginTop: Theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.sm,
  },
  emptyText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
  },
});
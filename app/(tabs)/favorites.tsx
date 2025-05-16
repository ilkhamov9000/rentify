import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Theme from "@/constants/theme";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/mocks/properties";
import useFavoritesStore from "@/store/favorites";
import { Property } from "@/types/property";
import { Heart } from "lucide-react-native";

export default function FavoritesScreen() {
  const { favoriteIds } = useFavoritesStore();
  
  const favoriteProperties = properties.filter((property) =>
    favoriteIds.includes(property.id)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PropertyCard property={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Heart size={60} color={Theme.colors.neutral.lightGray} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>
              Properties you like will appear here. Start browsing and save your favorites!
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
    marginVertical: Theme.spacing.md,
  },
  emptyText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
  },
});
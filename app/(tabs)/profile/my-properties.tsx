import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Edit, Trash2, Plus } from "lucide-react-native";
import Theme from "@/constants/theme";
import useAuthStore from "@/store/auth";
import { properties } from "@/mocks/properties";
import { Property } from "@/types/property";

// Mock user properties (in a real app, this would come from an API)
const userProperties = properties.slice(0, 3);

export default function MyPropertiesScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [userListings, setUserListings] = useState<Property[]>(userProperties);
  
  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Sign in to view your properties</Text>
        <Text style={styles.authText}>
          You need to be logged in to manage your property listings.
        </Text>
        <Pressable
          style={styles.authButton}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.authButtonText}>Sign In</Text>
        </Pressable>
      </View>
    );
  }
  
  const handleDeleteProperty = (id: string) => {
    // In a real app, this would call an API to delete the property
    setUserListings(userListings.filter(property => property.id !== id));
  };
  
  const handleEditProperty = (id: string) => {
    // In a real app, navigate to edit property screen
    console.log(`Edit property ${id}`);
  };
  
  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyItem}>
      <Image
        source={{ uri: item.images[0] }}
        style={styles.propertyImage}
        contentFit="cover"
      />
      
      <View style={styles.propertyContent}>
        <Text style={styles.propertyTitle} numberOfLines={1}>
          {item.title}
        </Text>
        
        <Text style={styles.propertyLocation} numberOfLines={1}>
          {item.location.district}, {item.location.city}
        </Text>
        
        <Text style={styles.propertyPrice}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.currency,
            maximumFractionDigits: 0,
          }).format(item.price)}
          {item.dealType === "rent" ? "/month" : ""}
        </Text>
        
        <View style={styles.propertyStatus}>
          <View style={[styles.statusBadge, styles.statusActive]}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.propertyActions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => handleEditProperty(item.id)}
        >
          <Edit size={18} color={Theme.colors.primary.main} />
        </Pressable>
        
        <Pressable
          style={styles.actionButton}
          onPress={() => handleDeleteProperty(item.id)}
        >
          <Trash2 size={18} color={Theme.colors.status.error} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.addButton}
        onPress={() => router.push("/profile/add-property")}
      >
        <Plus size={20} color={Theme.colors.neutral.white} />
        <Text style={styles.addButtonText}>Add New Property</Text>
      </Pressable>
      
      <FlatList
        data={userListings}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No properties yet</Text>
            <Text style={styles.emptyText}>
              You haven't added any properties yet. Click the button above to add your first property.
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.primary.main,
    margin: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  addButtonText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    marginLeft: Theme.spacing.sm,
  },
  listContainer: {
    padding: Theme.spacing.md,
  },
  propertyItem: {
    flexDirection: "row",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    overflow: "hidden",
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.small,
  },
  propertyImage: {
    width: 100,
    height: "100%",
  },
  propertyContent: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  propertyTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
    marginBottom: 2,
  },
  propertyLocation: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.primary.main,
    marginBottom: 8,
  },
  propertyStatus: {
    flexDirection: "row",
  },
  statusBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.sm,
  },
  statusActive: {
    backgroundColor: "#E6F7ED",
  },
  statusText: {
    fontSize: Theme.typography.sizes.xs,
    fontWeight: Theme.typography.weights.medium,
    color: "#34A853",
  },
  propertyActions: {
    justifyContent: "space-around",
    padding: Theme.spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: Theme.colors.neutral.lightGray,
  },
  actionButton: {
    padding: Theme.spacing.xs,
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
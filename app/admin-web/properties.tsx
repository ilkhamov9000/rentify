import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Platform } from "react-native";
import { Stack, useRouter } from "expo-router";
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  Home
} from 'lucide-react-native';
import { Image } from "expo-image";
import Theme from "@/constants/theme";
import { properties } from "@/mocks/properties";
import { ModerationStatus, Property } from "@/types/property";

export default function AdminProperties() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<ModerationStatus | "all" | "verified">("all");
  
  // Filter properties based on search query and filter status
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === "all") {
      return matchesSearch;
    } else if (filterStatus === "verified") {
      return matchesSearch && property.verified;
    } else {
      return matchesSearch && property.moderationStatus === filterStatus;
    }
  });
  
  // Filter options
  const filterOptions = [
    { label: "All", value: "all", icon: <Home size={18} color={Theme.colors.primary.main} /> },
    { label: "Pending", value: "pending", icon: <Clock size={18} color={Theme.colors.status.warning} /> },
    { label: "Approved", value: "approved", icon: <CheckCircle size={18} color={Theme.colors.status.success} /> },
    { label: "Rejected", value: "rejected", icon: <XCircle size={18} color={Theme.colors.status.error} /> },
    { label: "Verified", value: "verified", icon: <ShieldCheck size={18} color={Theme.colors.secondary.main} /> },
  ];
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Manage Properties" }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Property Management</Text>
        <Text style={styles.headerSubtitle}>Review, approve, and verify property listings</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Theme.colors.neutral.darkGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search properties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Filter size={20} color={Theme.colors.neutral.darkGray} />
            <Text style={styles.filterTitle}>Filter by status</Text>
          </View>
          
          <View style={styles.filterOptions}>
            {filterOptions.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.filterOption,
                  filterStatus === option.value && styles.filterOptionActive,
                ]}
                onPress={() => setFilterStatus(option.value as ModerationStatus | "all" | "verified")}
              >
                {option.icon}
                <Text
                  style={[
                    styles.filterOptionText,
                    filterStatus === option.value && styles.filterOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          Showing {filteredProperties.length} of {properties.length} properties
        </Text>
      </View>
      
      <View style={styles.propertiesContainer}>
        {filteredProperties.map((property) => (
          <PropertyListItem
            key={property.id}
            property={property}
            onPress={() => router.push(`/admin-web/property-details?id=${property.id}`)}
          />
        ))}
        
        {filteredProperties.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No properties found matching your criteria</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

interface PropertyListItemProps {
  property: Property;
  onPress: () => void;
}

function PropertyListItem({ property, onPress }: PropertyListItemProps) {
  // Status badge based on moderation status
  const getBadge = () => {
    if (property.moderationStatus === "pending") {
      return (
        <View style={[styles.badge, styles.pendingBadge]}>
          <Clock size={14} color={Theme.colors.status.warning} />
          <Text style={[styles.badgeText, styles.pendingBadgeText]}>Pending</Text>
        </View>
      );
    } else if (property.moderationStatus === "approved") {
      return (
        <View style={[styles.badge, styles.approvedBadge]}>
          <CheckCircle size={14} color={Theme.colors.status.success} />
          <Text style={[styles.badgeText, styles.approvedBadgeText]}>Approved</Text>
        </View>
      );
    } else if (property.moderationStatus === "rejected") {
      return (
        <View style={[styles.badge, styles.rejectedBadge]}>
          <XCircle size={14} color={Theme.colors.status.error} />
          <Text style={[styles.badgeText, styles.rejectedBadgeText]}>Rejected</Text>
        </View>
      );
    }
    return null;
  };
  
  return (
    <Pressable style={styles.propertyItem} onPress={onPress}>
      <Image
        source={{ uri: property.images[0] }}
        style={styles.propertyImage}
      />
      
      <View style={styles.propertyContent}>
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyTitle} numberOfLines={1}>
            {property.title}
          </Text>
          {property.verified && (
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={14} color={Theme.colors.secondary.main} />
              <Text style={styles.verifiedBadgeText}>Verified</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.propertyLocation} numberOfLines={1}>
          {property.location.city}, {property.location.district}
        </Text>
        
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyPrice}>
            ${property.price.toLocaleString()}
            {property.dealType === "rent" ? "/month" : ""}
          </Text>
          
          <View style={styles.propertyType}>
            <Text style={styles.propertyTypeText}>
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.propertyFooter}>
          {getBadge()}
          <Text style={styles.propertyDate}>
            Added: {new Date(property.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      
      <ChevronRight size={20} color={Theme.colors.neutral.darkGray} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  header: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  headerTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: "700",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
  },
  searchContainer: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: Theme.spacing.sm,
    color: Theme.colors.neutral.black,
  },
  filterContainer: {
    marginTop: Theme.spacing.sm,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  filterTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginLeft: Theme.spacing.sm,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  filterOptionActive: {
    backgroundColor: Theme.colors.primary.light,
  },
  filterOptionText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.xs,
  },
  filterOptionTextActive: {
    color: Theme.colors.primary.main,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  statsText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  propertiesContainer: {
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  propertyItem: {
    flexDirection: "row",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    overflow: "hidden",
  },
  propertyImage: {
    width: 100,
    height: 100,
  },
  propertyContent: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.xs,
  },
  propertyTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    flex: 1,
  },
  propertyLocation: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginBottom: Theme.spacing.sm,
  },
  propertyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  propertyPrice: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "700",
    color: Theme.colors.primary.main,
  },
  propertyType: {
    backgroundColor: Theme.colors.primary.light,
    paddingVertical: 2,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  propertyTypeText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.primary.main,
    fontWeight: "600",
  },
  propertyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  pendingBadge: {
    backgroundColor: Theme.colors.status.warningLight,
  },
  approvedBadge: {
    backgroundColor: Theme.colors.status.successLight,
  },
  rejectedBadge: {
    backgroundColor: Theme.colors.status.errorLight,
  },
  badgeText: {
    fontSize: Theme.typography.sizes.xs,
    marginLeft: 4,
  },
  pendingBadgeText: {
    color: Theme.colors.status.warning,
  },
  approvedBadgeText: {
    color: Theme.colors.status.success,
  },
  rejectedBadgeText: {
    color: Theme.colors.status.error,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.secondary.light,
    paddingVertical: 2,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    marginLeft: Theme.spacing.sm,
  },
  verifiedBadgeText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.secondary.main,
    fontWeight: "600",
    marginLeft: 4,
  },
  propertyDate: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.neutral.gray,
  },
  emptyState: {
    padding: Theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    textAlign: "center",
  },
});
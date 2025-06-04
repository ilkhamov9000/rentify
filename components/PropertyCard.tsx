import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Theme from "@/constants/theme";
import { Property } from "@/types/property";
import useFavoritesStore from "@/store/favorites";

// Import icons from the main package
import { Bed, Bath, Car, MapPin, ShieldCheck } from 'lucide-react-native';

interface PropertyCardProps {
  property: Property;
  horizontal?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, horizontal = false }) => {
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const isFavorite = favoriteIds.includes(property.id);

  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <Pressable
      style={[
        styles.container,
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
      ]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.images[0] }}
          style={styles.image}
          contentFit="cover"
        />
        {property.dealType === "rent" ? (
          <View style={styles.rentBadge}>
            <Text style={styles.rentBadgeText}>For Rent</Text>
          </View>
        ) : (
          <View style={styles.saleBadge}>
            <Text style={styles.saleBadgeText}>For Sale</Text>
          </View>
        )}
        
        {property.verified && (
          <View style={styles.verifiedBadge}>
            <ShieldCheck size={12} color={Theme.colors.secondary.main} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
        
        <Pressable
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onPress={handleFavoritePress}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.price}>
          ${property.price.toLocaleString()}
          {property.dealType === "rent" ? "/month" : ""}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {property.title}
        </Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Theme.colors.neutral.darkGray} />
          <Text style={styles.location} numberOfLines={1}>
            {property.location.district}, {property.location.city}
          </Text>
        </View>

        <View style={styles.specs}>
          <View style={styles.specItem}>
            <Bed size={14} color={Theme.colors.primary.main} />
            <Text style={styles.specText}>{property.specifications.bedrooms}</Text>
          </View>
          <View style={styles.specItem}>
            <Bath size={14} color={Theme.colors.primary.main} />
            <Text style={styles.specText}>{property.specifications.bathrooms}</Text>
          </View>
          <View style={styles.specItem}>
            <Car size={14} color={Theme.colors.primary.main} />
            <Text style={styles.specText}>{property.specifications.parking}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specText}>{property.specifications.area} m²</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    overflow: "hidden",
    ...Theme.shadows.sm,
  },
  verticalContainer: {
    width: "100%",
    marginBottom: Theme.spacing.md,
  },
  horizontalContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: Theme.spacing.md,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    height: 180,
    width: "100%",
  },
  rentBadge: {
    position: "absolute",
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    backgroundColor: Theme.colors.status.info,
    paddingVertical: 4,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  rentBadgeText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.xs,
    fontWeight: "500",
  },
  saleBadge: {
    position: "absolute",
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    backgroundColor: Theme.colors.status.success,
    paddingVertical: 4,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  saleBadgeText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.xs,
    fontWeight: "500",
  },
  verifiedBadge: {
    position: "absolute",
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: Theme.colors.secondary.light,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  verifiedText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.secondary.main,
    fontWeight: "600",
    marginLeft: 4,
  },
  favoriteButton: {
    position: "absolute",
    bottom: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: Theme.colors.neutral.white,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.sm,
  },
  favoriteButtonActive: {
    backgroundColor: Theme.colors.status.error,
  },
  favoriteButtonText: {
    fontSize: 18,
    color: Theme.colors.status.error,
    lineHeight: 20,
  },
  content: {
    padding: Theme.spacing.md,
  },
  price: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: "700",
    color: Theme.colors.primary.main,
    marginBottom: Theme.spacing.xs,
  },
  title: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  location: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: 4,
  },
  specs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  specText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: 4,
  },
});
export default PropertyCard;

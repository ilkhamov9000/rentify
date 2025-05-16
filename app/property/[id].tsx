import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Linking, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowLeft,
  Bed,
  Bath,
  Car,
  Maximize,
  Check
} from "lucide-react-native";
import Theme from "@/constants/theme";
import { getPropertyById } from "@/mocks/properties";
import useFavoritesStore from "@/store/favorites";
import ImageCarousel from "@/components/ImageCarousel";
import Button from "@/components/Button";
import useAuthStore from "@/store/auth";

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const property = getPropertyById(id);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();
  const favorite = isFavorite(id);
  
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  if (!property) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Property not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()} 
          style={styles.goBackButton}
        />
      </View>
    );
  }
  
  const handleFavoritePress = () => {
    toggleFavorite(id);
  };
  
  const handleSharePress = async () => {
    try {
      if (Platform.OS === "web") {
        alert("Sharing is not available on web");
        return;
      }
      
      // In a real app, implement sharing functionality
      console.log("Share property");
    } catch (error) {
      console.error("Error sharing property:", error);
    }
  };
  
  const handleCallPress = () => {
    if (property.owner.phone) {
      Linking.openURL(`tel:${property.owner.phone}`);
    }
  };
  
  const handleMessagePress = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    
    // In a real app, navigate to chat with the owner
    console.log("Message owner");
  };
  
  const formatPrice = () => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: property.currency,
      maximumFractionDigits: 0,
    }).format(property.price);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ImageCarousel images={property.images} height={300} />
          
          <Pressable
            style={[styles.backButton, styles.headerButton]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Theme.colors.neutral.white} />
          </Pressable>
          
          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerButton}
              onPress={handleFavoritePress}
            >
              <Heart
                size={24}
                color={Theme.colors.neutral.white}
                fill={favorite ? Theme.colors.status.error : "transparent"}
                stroke={favorite ? Theme.colors.status.error : Theme.colors.neutral.white}
              />
            </Pressable>
            
            <Pressable
              style={styles.headerButton}
              onPress={handleSharePress}
            >
              <Share2 size={24} color={Theme.colors.neutral.white} />
            </Pressable>
          </View>
          
          <View style={styles.dealTypeTag}>
            <Text style={styles.dealTypeText}>
              {property.dealType === "rent" ? "For Rent" : "For Sale"}
            </Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.price}>
            {formatPrice()}
            {property.dealType === "rent" ? "/month" : ""}
          </Text>
          
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={16} color={Theme.colors.primary.main} />
            <Text style={styles.locationText}>
              {property.location.address}, {property.location.district}, {property.location.city}
            </Text>
          </View>
          
          <View style={styles.specsContainer}>
            <View style={styles.specItem}>
              <Bed size={20} color={Theme.colors.primary.main} />
              <Text style={styles.specValue}>{property.specifications.bedrooms}</Text>
              <Text style={styles.specLabel}>Bedrooms</Text>
            </View>
            
            <View style={styles.specItem}>
              <Bath size={20} color={Theme.colors.primary.main} />
              <Text style={styles.specValue}>{property.specifications.bathrooms}</Text>
              <Text style={styles.specLabel}>Bathrooms</Text>
            </View>
            
            <View style={styles.specItem}>
              <Car size={20} color={Theme.colors.primary.main} />
              <Text style={styles.specValue}>{property.specifications.parking}</Text>
              <Text style={styles.specLabel}>Parking</Text>
            </View>
            
            <View style={styles.specItem}>
              <Maximize size={20} color={Theme.colors.primary.main} />
              <Text style={styles.specValue}>{property.specifications.area}</Text>
              <Text style={styles.specLabel}>m²</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={showFullDescription ? undefined : 5}
            >
              {property.description}
            </Text>
            {property.description.length > 150 && (
              <Pressable
                onPress={() => setShowFullDescription(!showFullDescription)}
              >
                <Text style={styles.readMoreText}>
                  {showFullDescription ? "Read less" : "Read more"}
                </Text>
              </Pressable>
            )}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Check size={16} color={Theme.colors.primary.main} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <View style={styles.ownerContainer}>
              <Image
                source={{ uri: property.owner.avatar }}
                style={styles.ownerAvatar}
              />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{property.owner.name}</Text>
                <Text style={styles.ownerRole}>Property Owner</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Call"
          variant="outline"
          icon={<Phone size={20} color={Theme.colors.primary.main} />}
          style={styles.callButton}
          onPress={handleCallPress}
        />
        <Button
          title="Message"
          icon={<MessageSquare size={20} color={Theme.colors.neutral.white} />}
          style={styles.messageButton}
          onPress={handleMessagePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  imageContainer: {
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: Theme.spacing.lg,
    left: Theme.spacing.md,
    zIndex: 10,
  },
  headerButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerActions: {
    position: "absolute",
    top: Theme.spacing.lg,
    right: Theme.spacing.md,
    flexDirection: "row",
    gap: Theme.spacing.sm,
    zIndex: 10,
  },
  dealTypeTag: {
    position: "absolute",
    bottom: Theme.spacing.md,
    left: Theme.spacing.md,
    backgroundColor: Theme.colors.primary.main,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    zIndex: 10,
  },
  dealTypeText: {
    color: Theme.colors.neutral.white,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.medium,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  price: {
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.primary.main,
    marginBottom: Theme.spacing.xs,
  },
  title: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.sm,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  locationText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.xs,
    flex: 1,
  },
  specsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.small,
  },
  specItem: {
    alignItems: "center",
  },
  specValue: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginVertical: 4,
  },
  specLabel: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.neutral.darkGray,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.md,
  },
  descriptionText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    lineHeight: 22,
  },
  readMoreText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.primary.main,
    fontWeight: Theme.typography.weights.medium,
    marginTop: Theme.spacing.sm,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  amenityText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.xs,
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.shadows.small,
  },
  ownerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Theme.spacing.md,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
    marginBottom: 2,
  },
  ownerRole: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  footer: {
    flexDirection: "row",
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral.lightGray,
  },
  callButton: {
    flex: 1,
    marginRight: Theme.spacing.sm,
  },
  messageButton: {
    flex: 2,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xl,
  },
  notFoundText: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.lg,
  },
  goBackButton: {
    width: "50%",
  },
});
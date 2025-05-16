import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Switch, TextInput, Alert, Platform } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  User,
  Phone,
  Mail,
  Home,
  Bed,
  Bath,
  Car,
  Ruler
} from "lucide-react-native";
import { Image } from "expo-image";
import Theme from "@/constants/theme";
import { getPropertyById, togglePropertyVerification, updatePropertyModerationStatus } from "@/mocks/properties";
import { ModerationStatus } from "@/types/property";
import Button from "@/components/Button";

export default function PropertyDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const property = getPropertyById(id);
  
  const [isVerified, setIsVerified] = useState(property?.verified || false);
  const [moderationStatus, setModerationStatus] = useState<ModerationStatus>(
    property?.moderationStatus || "pending"
  );
  const [moderationNotes, setModerationNotes] = useState(property?.moderationNotes || "");
  
  if (!property) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Property not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()} 
          style={styles.backButton}
        />
      </View>
    );
  }
  
  const handleVerificationToggle = () => {
    const updatedProperty = togglePropertyVerification(property.id);
    if (updatedProperty) {
      setIsVerified(updatedProperty.verified || false);
      Alert.alert(
        "Verification Updated",
        `Property has been ${updatedProperty.verified ? "verified" : "unverified"}.`
      );
    }
  };
  
  const handleStatusChange = (status: ModerationStatus) => {
    const updatedProperty = updatePropertyModerationStatus(property.id, status, moderationNotes);
    if (updatedProperty) {
      setModerationStatus(updatedProperty.moderationStatus || "pending");
      Alert.alert(
        "Status Updated",
        `Property has been ${status}.`
      );
    }
  };
  
  const handleSaveNotes = () => {
    const updatedProperty = updatePropertyModerationStatus(property.id, moderationStatus, moderationNotes);
    if (updatedProperty) {
      Alert.alert(
        "Notes Saved",
        "Moderation notes have been updated."
      );
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Property Details" }} />
      
      <View style={styles.imageCarousel}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {property.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.propertyImage}
            />
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          {isVerified && (
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={16} color={Theme.colors.secondary.main} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={Theme.colors.neutral.darkGray} />
          <Text style={styles.locationText}>
            {property.location.address}, {property.location.district}, {property.location.city}
          </Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.priceValue}>
            ${property.price.toLocaleString()} {property.dealType === "rent" ? "/month" : ""}
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Details</Text>
        
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Home size={20} color={Theme.colors.primary.main} />
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ruler size={20} color={Theme.colors.primary.main} />
            <Text style={styles.detailLabel}>Area</Text>
            <Text style={styles.detailValue}>{property.specifications.area} m²</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Bed size={20} color={Theme.colors.primary.main} />
            <Text style={styles.detailLabel}>Bedrooms</Text>
            <Text style={styles.detailValue}>{property.specifications.bedrooms}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Bath size={20} color={Theme.colors.primary.main} />
            <Text style={styles.detailLabel}>Bathrooms</Text>
            <Text style={styles.detailValue}>{property.specifications.bathrooms}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Car size={20} color={Theme.colors.primary.main} />
            <Text style={styles.detailLabel}>Parking</Text>
            <Text style={styles.detailValue}>{property.specifications.parking}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Calendar size={20} color={Theme.colors.primary.main} />
            <Text style={styles.detailLabel}>Listed</Text>
            <Text style={styles.detailValue}>
              {new Date(property.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{property.description}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {property.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityItem}>
              <CheckCircle size={16} color={Theme.colors.primary.main} />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Owner Information</Text>
        <View style={styles.ownerContainer}>
          <Image
            source={{ uri: property.owner.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" }}
            style={styles.ownerAvatar}
          />
          <View style={styles.ownerInfo}>
            <View style={styles.ownerDetail}>
              <User size={16} color={Theme.colors.neutral.darkGray} />
              <Text style={styles.ownerText}>{property.owner.name}</Text>
            </View>
            
            {property.owner.phone && (
              <View style={styles.ownerDetail}>
                <Phone size={16} color={Theme.colors.neutral.darkGray} />
                <Text style={styles.ownerText}>{property.owner.phone}</Text>
              </View>
            )}
            
            {property.owner.id && (
              <View style={styles.ownerDetail}>
                <Mail size={16} color={Theme.colors.neutral.darkGray} />
                <Text style={styles.ownerText}>User ID: {property.owner.id}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.moderationSection}>
        <Text style={styles.sectionTitle}>Moderation Controls</Text>
        
        <View style={styles.moderationControl}>
          <View style={styles.moderationItem}>
            <Text style={styles.moderationLabel}>Verification Status</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                {isVerified ? "Verified" : "Not Verified"}
              </Text>
              <Switch
                value={isVerified}
                onValueChange={handleVerificationToggle}
                trackColor={{ false: Theme.colors.neutral.lightGray, true: Theme.colors.secondary.light }}
                thumbColor={isVerified ? Theme.colors.secondary.main : Theme.colors.neutral.gray}
              />
            </View>
          </View>
          
          <View style={styles.moderationItem}>
            <Text style={styles.moderationLabel}>Moderation Status</Text>
            <View style={styles.statusButtons}>
              <Button
                title="Approve"
                onPress={() => handleStatusChange("approved")}
                style={[
                  styles.statusButton,
                  moderationStatus === "approved" && styles.activeStatusButton,
                ]}
                textStyle={[
                  styles.statusButtonText,
                  moderationStatus === "approved" && styles.activeStatusButtonText,
                ]}
                variant={moderationStatus === "approved" ? "primary" : "outline"}
                size="small"
              />
              
              <Button
                title="Pending"
                onPress={() => handleStatusChange("pending")}
                style={[
                  styles.statusButton,
                  moderationStatus === "pending" && styles.pendingStatusButton,
                ]}
                textStyle={[
                  styles.statusButtonText,
                  moderationStatus === "pending" && styles.pendingStatusButtonText,
                ]}
                variant={moderationStatus === "pending" ? "primary" : "outline"}
                size="small"
              />
              
              <Button
                title="Reject"
                onPress={() => handleStatusChange("rejected")}
                style={[
                  styles.statusButton,
                  moderationStatus === "rejected" && styles.rejectStatusButton,
                ]}
                textStyle={[
                  styles.statusButtonText,
                  moderationStatus === "rejected" && styles.rejectStatusButtonText,
                ]}
                variant={moderationStatus === "rejected" ? "primary" : "outline"}
                size="small"
              />
            </View>
          </View>
          
          <View style={styles.moderationItem}>
            <Text style={styles.moderationLabel}>Moderation Notes</Text>
            <TextInput
              style={styles.notesInput}
              multiline
              numberOfLines={4}
              placeholder="Add notes about this property..."
              value={moderationNotes}
              onChangeText={setModerationNotes}
            />
            <Button
              title="Save Notes"
              onPress={handleSaveNotes}
              style={styles.saveButton}
              size="small"
            />
          </View>
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
  imageCarousel: {
    height: 250,
    backgroundColor: Theme.colors.neutral.black,
  },
  propertyImage: {
    width: Platform.OS === "web" ? 400 : 300,
    height: 250,
    marginRight: 2,
  },
  header: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  propertyTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: "700",
    color: Theme.colors.neutral.black,
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.secondary.light,
    paddingVertical: 4,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    marginLeft: Theme.spacing.sm,
  },
  verifiedText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.secondary.main,
    fontWeight: "600",
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  locationText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.xs,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginRight: Theme.spacing.sm,
  },
  priceValue: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: "700",
    color: Theme.colors.primary.main,
  },
  section: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.md,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  detailLabel: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginTop: Theme.spacing.xs,
  },
  detailValue: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
  },
  descriptionText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    lineHeight: 24,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: Theme.spacing.md,
  },
  amenityText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.sm,
  },
  ownerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Theme.spacing.md,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  ownerText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
    marginLeft: Theme.spacing.sm,
  },
  moderationSection: {
    backgroundColor: Theme.colors.neutral.white,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.primary.light,
  },
  moderationControl: {
    gap: Theme.spacing.lg,
  },
  moderationItem: {
    marginBottom: Theme.spacing.md,
  },
  moderationLabel: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: "600",
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.sm,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
  },
  statusButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  statusButtonText: {
    fontSize: Theme.typography.sizes.sm,
  },
  activeStatusButton: {
    backgroundColor: Theme.colors.status.success,
    borderColor: Theme.colors.status.success,
  },
  activeStatusButtonText: {
    color: Theme.colors.neutral.white,
  },
  pendingStatusButton: {
    backgroundColor: Theme.colors.status.warning,
    borderColor: Theme.colors.status.warning,
  },
  pendingStatusButtonText: {
    color: Theme.colors.neutral.white,
  },
  rejectStatusButton: {
    backgroundColor: Theme.colors.status.error,
    borderColor: Theme.colors.status.error,
  },
  rejectStatusButtonText: {
    color: Theme.colors.neutral.white,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: Theme.colors.neutral.lightGray,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
    backgroundColor: Theme.colors.neutral.white,
    textAlignVertical: "top",
    minHeight: 100,
  },
  saveButton: {
    marginTop: Theme.spacing.md,
    alignSelf: "flex-end",
  },
  errorText: {
    fontSize: Theme.typography.sizes.lg,
    color: Theme.colors.status.error,
    textAlign: "center",
    marginTop: Theme.spacing.xl,
  },
  backButton: {
    marginTop: Theme.spacing.lg,
    alignSelf: "center",
  },
});
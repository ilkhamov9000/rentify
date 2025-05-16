import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Camera, MapPin, Plus, X } from "lucide-react-native";
import Theme from "@/constants/theme";
import Button from "@/components/Button";
import { PropertyType, DealType } from "@/types/property";
import useAuthStore from "@/store/auth";

interface FormData {
  title: string;
  description: string;
  price: string;
  location: {
    city: string;
    district: string;
    address: string;
  };
  specifications: {
    area: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
  };
  amenities: string[];
  images: string[];
  type: PropertyType;
  dealType: DealType;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  price: "",
  location: {
    city: "",
    district: "",
    address: "",
  },
  specifications: {
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
  },
  amenities: [],
  images: [],
  type: "apartment",
  dealType: "rent",
};

const propertyTypes: { id: PropertyType; label: string }[] = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "villa", label: "Villa" },
  { id: "office", label: "Office" },
  { id: "commercial", label: "Commercial" },
  { id: "land", label: "Land" },
];

const dealTypes: { id: DealType; label: string }[] = [
  { id: "rent", label: "For Rent" },
  { id: "sale", label: "For Sale" },
];

const amenitiesList: { id: string; label: string }[] = [
  { id: "air_conditioning", label: "Air Conditioning" },
  { id: "parking", label: "Parking" },
  { id: "elevator", label: "Elevator" },
  { id: "gym", label: "Gym" },
  { id: "swimming_pool", label: "Swimming Pool" },
  { id: "security", label: "Security" },
  { id: "balcony", label: "Balcony" },
  { id: "garden", label: "Garden" },
  { id: "fireplace", label: "Fireplace" },
];

export default function AddPropertyScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Sign in to add a property</Text>
        <Text style={styles.authText}>
          You need to be logged in to add a new property listing.
        </Text>
        <Button
          title="Sign In"
          onPress={() => router.push("/auth/login")}
          style={styles.signInButton}
        />
      </View>
    );
  }
  
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const handleLocationChange = (field: keyof FormData["location"], value: string) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [field]: value,
      },
    });
  };
  
  const handleSpecificationsChange = (field: keyof FormData["specifications"], value: string) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [field]: value,
      },
    });
  };
  
  const toggleAmenity = (id: string) => {
    if (formData.amenities.includes(id)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(amenity => amenity !== id),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, id],
      });
    }
  };
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({
        ...formData,
        images: [...formData.images, result.assets[0].uri],
      });
    }
  };
  
  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
  
  const validateForm = (): boolean => {
    if (!formData.title) {
      Alert.alert("Error", "Please enter a title");
      return false;
    }
    
    if (!formData.description) {
      Alert.alert("Error", "Please enter a description");
      return false;
    }
    
    if (!formData.price) {
      Alert.alert("Error", "Please enter a price");
      return false;
    }
    
    if (!formData.location.city || !formData.location.district || !formData.location.address) {
      Alert.alert("Error", "Please fill in all location fields");
      return false;
    }
    
    if (!formData.specifications.area) {
      Alert.alert("Error", "Please enter the property area");
      return false;
    }
    
    if (formData.images.length === 0) {
      Alert.alert("Error", "Please add at least one image");
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to save the property
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        "Success",
        "Your property has been submitted for review",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Images</Text>
          <Text style={styles.sectionDescription}>
            Add high-quality images of your property (max 10)
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imagesContainer}
          >
            {formData.images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.propertyImage} />
                <Pressable 
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <X size={16} color={Theme.colors.neutral.white} />
                </Pressable>
              </View>
            ))}
            
            {formData.images.length < 10 && (
              <Pressable style={styles.addImageButton} onPress={pickImage}>
                <Camera size={24} color={Theme.colors.primary.main} />
                <Text style={styles.addImageText}>Add Image</Text>
              </Pressable>
            )}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Modern Apartment with City View"
              value={formData.title}
              onChangeText={(value) => handleInputChange("title", value)}
              maxLength={100}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your property..."
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1200"
              value={formData.price}
              onChangeText={(value) => handleInputChange("price", value)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Property Type</Text>
            <View style={styles.optionsContainer}>
              {propertyTypes.map((type) => (
                <Pressable
                  key={type.id}
                  style={[
                    styles.optionButton,
                    formData.type === type.id && styles.selectedOption,
                  ]}
                  onPress={() => handleInputChange("type", type.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.type === type.id && styles.selectedOptionText,
                    ]}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Deal Type</Text>
            <View style={styles.dealTypeContainer}>
              {dealTypes.map((type) => (
                <Pressable
                  key={type.id}
                  style={[
                    styles.dealTypeButton,
                    formData.dealType === type.id && styles.selectedDealType,
                  ]}
                  onPress={() => handleInputChange("dealType", type.id)}
                >
                  <Text
                    style={[
                      styles.dealTypeText,
                      formData.dealType === type.id && styles.selectedDealTypeText,
                    ]}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. New York"
              value={formData.location.city}
              onChangeText={(value) => handleLocationChange("city", value)}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>District/Neighborhood</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Manhattan"
              value={formData.location.district}
              onChangeText={(value) => handleLocationChange("district", value)}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 123 Broadway St"
              value={formData.location.address}
              onChangeText={(value) => handleLocationChange("address", value)}
            />
          </View>
          
          <Pressable style={styles.mapButton}>
            <MapPin size={20} color={Theme.colors.primary.main} />
            <Text style={styles.mapButtonText}>Select Location on Map</Text>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          
          <View style={styles.specificationsContainer}>
            <View style={styles.specificationItem}>
              <Text style={styles.label}>Area (m²)</Text>
              <TextInput
                style={styles.specificationInput}
                placeholder="0"
                value={formData.specifications.area}
                onChangeText={(value) => handleSpecificationsChange("area", value)}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.specificationItem}>
              <Text style={styles.label}>Bedrooms</Text>
              <TextInput
                style={styles.specificationInput}
                placeholder="0"
                value={formData.specifications.bedrooms}
                onChangeText={(value) => handleSpecificationsChange("bedrooms", value)}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.specificationItem}>
              <Text style={styles.label}>Bathrooms</Text>
              <TextInput
                style={styles.specificationInput}
                placeholder="0"
                value={formData.specifications.bathrooms}
                onChangeText={(value) => handleSpecificationsChange("bathrooms", value)}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.specificationItem}>
              <Text style={styles.label}>Parking</Text>
              <TextInput
                style={styles.specificationInput}
                placeholder="0"
                value={formData.specifications.parking}
                onChangeText={(value) => handleSpecificationsChange("parking", value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <Text style={styles.sectionDescription}>
            Select all amenities that apply to your property
          </Text>
          
          <View style={styles.amenitiesContainer}>
            {amenitiesList.map((amenity) => (
              <Pressable
                key={amenity.id}
                style={[
                  styles.amenityButton,
                  formData.amenities.includes(amenity.id) && styles.selectedAmenity,
                ]}
                onPress={() => toggleAmenity(amenity.id)}
              >
                <Text
                  style={[
                    styles.amenityText,
                    formData.amenities.includes(amenity.id) && styles.selectedAmenityText,
                  ]}
                >
                  {amenity.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => router.back()}
            style={styles.cancelButton}
          />
          <Button
            title="Submit Property"
            onPress={handleSubmit}
            loading={isSubmitting}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  sectionDescription: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginBottom: Theme.spacing.md,
  },
  imagesContainer: {
    flexDirection: "row",
    paddingVertical: Theme.spacing.sm,
  },
  imageContainer: {
    position: "relative",
    marginRight: Theme.spacing.sm,
  },
  propertyImage: {
    width: 120,
    height: 90,
    borderRadius: Theme.borderRadius.md,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: Theme.borderRadius.full,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageButton: {
    width: 120,
    height: 90,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.neutral.lightGray,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.neutral.white,
  },
  addImageText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.primary.main,
    marginTop: Theme.spacing.xs,
  },
  inputContainer: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.medium,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
    borderWidth: 1,
    borderColor: Theme.colors.neutral.lightGray,
  },
  textArea: {
    minHeight: 120,
    paddingTop: Theme.spacing.sm,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.neutral.white,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.neutral.lightGray,
  },
  selectedOption: {
    backgroundColor: Theme.colors.primary.main,
    borderColor: Theme.colors.primary.main,
  },
  optionText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
  },
  selectedOptionText: {
    color: Theme.colors.neutral.white,
    fontWeight: Theme.typography.weights.medium,
  },
  dealTypeContainer: {
    flexDirection: "row",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Theme.colors.neutral.lightGray,
  },
  dealTypeButton: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    alignItems: "center",
  },
  selectedDealType: {
    backgroundColor: Theme.colors.primary.main,
  },
  dealTypeText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.darkGray,
  },
  selectedDealTypeText: {
    color: Theme.colors.neutral.white,
    fontWeight: Theme.typography.weights.medium,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.primary.main,
    marginTop: Theme.spacing.sm,
  },
  mapButtonText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.primary.main,
    fontWeight: Theme.typography.weights.medium,
    marginLeft: Theme.spacing.sm,
  },
  specificationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  specificationItem: {
    width: "48%",
    marginBottom: Theme.spacing.md,
  },
  specificationInput: {
    backgroundColor: Theme.colors.neutral.white,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
    borderWidth: 1,
    borderColor: Theme.colors.neutral.lightGray,
    textAlign: "center",
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.neutral.white,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.neutral.lightGray,
  },
  selectedAmenity: {
    backgroundColor: Theme.colors.primary.main,
    borderColor: Theme.colors.primary.main,
  },
  amenityText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
  },
  selectedAmenityText: {
    color: Theme.colors.neutral.white,
    fontWeight: Theme.typography.weights.medium,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  cancelButton: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  submitButton: {
    flex: 2,
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
  signInButton: {
    width: "100%",
  },
});
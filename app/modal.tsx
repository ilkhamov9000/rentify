import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Pressable,
  Switch,
  TextInput
} from "react-native";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import Theme from "@/constants/theme";
import Button from "@/components/Button";
import CustomSlider from "@/components/CustomSlider";

interface FilterOption {
  id: string;
  label: string;
}

const propertyTypes: FilterOption[] = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "villa", label: "Villa" },
  { id: "office", label: "Office" },
  { id: "commercial", label: "Commercial" },
  { id: "land", label: "Land" },
];

const dealTypes: FilterOption[] = [
  { id: "rent", label: "For Rent" },
  { id: "sale", label: "For Sale" },
];

const amenities: FilterOption[] = [
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

export default function FilterModal() {
  const router = useRouter();
  
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedDealType, setSelectedDealType] = useState<string>("rent");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const togglePropertyType = (id: string) => {
    if (selectedPropertyTypes.includes(id)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(type => type !== id));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, id]);
    }
  };
  
  const toggleAmenity = (id: string) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter(amenity => amenity !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };
  
  const handleApplyFilters = () => {
    // In a real app, you would pass these filters to a search function
    console.log({
      propertyTypes: selectedPropertyTypes,
      dealType: selectedDealType,
      priceRange,
      bedrooms,
      bathrooms,
      amenities: selectedAmenities,
    });
    
    router.back();
  };
  
  const handleResetFilters = () => {
    setSelectedPropertyTypes([]);
    setSelectedDealType("rent");
    setPriceRange([0, 5000]);
    setBedrooms(0);
    setBathrooms(0);
    setSelectedAmenities([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <X size={24} color={Theme.colors.neutral.black} />
        </Pressable>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          <View style={styles.optionsContainer}>
            {propertyTypes.map((type) => (
              <Pressable
                key={type.id}
                style={[
                  styles.optionButton,
                  selectedPropertyTypes.includes(type.id) && styles.selectedOption,
                ]}
                onPress={() => togglePropertyType(type.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedPropertyTypes.includes(type.id) && styles.selectedOptionText,
                  ]}
                >
                  {type.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deal Type</Text>
          <View style={styles.dealTypeContainer}>
            {dealTypes.map((type) => (
              <Pressable
                key={type.id}
                style={[
                  styles.dealTypeButton,
                  selectedDealType === type.id && styles.selectedDealType,
                ]}
                onPress={() => setSelectedDealType(type.id)}
              >
                <Text
                  style={[
                    styles.dealTypeText,
                    selectedDealType === type.id && styles.selectedDealTypeText,
                  ]}
                >
                  {type.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.priceInputContainer}>
            <View style={styles.priceInput}>
              <Text style={styles.priceInputLabel}>Min</Text>
              <TextInput
                style={styles.priceInputField}
                value={`$${priceRange[0]}`}
                onChangeText={(text) => {
                  const value = parseInt(text.replace(/\D/g, ""));
                  if (!isNaN(value)) {
                    setPriceRange([value, priceRange[1]]);
                  }
                }}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.priceInputDivider} />
            <View style={styles.priceInput}>
              <Text style={styles.priceInputLabel}>Max</Text>
              <TextInput
                style={styles.priceInputField}
                value={`$${priceRange[1]}`}
                onChangeText={(text) => {
                  const value = parseInt(text.replace(/\D/g, ""));
                  if (!isNaN(value)) {
                    setPriceRange([priceRange[0], value]);
                  }
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
          <CustomSlider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10000}
            step={100}
            value={priceRange[1]}
            onValueChange={(value) => setPriceRange([priceRange[0], value])}
            minimumTrackTintColor={Theme.colors.primary.main}
            maximumTrackTintColor={Theme.colors.neutral.lightGray}
            thumbTintColor={Theme.colors.primary.main}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bedrooms</Text>
          <View style={styles.countSelector}>
            <Pressable
              style={[styles.countButton, bedrooms === 0 && styles.disabledButton]}
              onPress={() => setBedrooms(Math.max(0, bedrooms - 1))}
              disabled={bedrooms === 0}
            >
              <Text style={styles.countButtonText}>-</Text>
            </Pressable>
            <Text style={styles.countText}>{bedrooms}</Text>
            <Pressable
              style={styles.countButton}
              onPress={() => setBedrooms(bedrooms + 1)}
            >
              <Text style={styles.countButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bathrooms</Text>
          <View style={styles.countSelector}>
            <Pressable
              style={[styles.countButton, bathrooms === 0 && styles.disabledButton]}
              onPress={() => setBathrooms(Math.max(0, bathrooms - 1))}
              disabled={bathrooms === 0}
            >
              <Text style={styles.countButtonText}>-</Text>
            </Pressable>
            <Text style={styles.countText}>{bathrooms}</Text>
            <Pressable
              style={styles.countButton}
              onPress={() => setBathrooms(bathrooms + 1)}
            >
              <Text style={styles.countButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          {amenities.map((amenity) => (
            <View key={amenity.id} style={styles.amenityItem}>
              <Text style={styles.amenityText}>{amenity.label}</Text>
              <Switch
                value={selectedAmenities.includes(amenity.id)}
                onValueChange={() => toggleAmenity(amenity.id)}
                trackColor={{ false: Theme.colors.neutral.lightGray, true: Theme.colors.primary.light }}
                thumbColor={selectedAmenities.includes(amenity.id) ? Theme.colors.primary.main : Theme.colors.neutral.white}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Reset"
          variant="outline"
          onPress={handleResetFilters}
          style={styles.resetButton}
        />
        <Button
          title="Apply Filters"
          onPress={handleApplyFilters}
          style={styles.applyButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  title: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.black,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
    marginBottom: Theme.spacing.md,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.neutral.background,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  selectedOption: {
    backgroundColor: Theme.colors.primary.main,
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
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    overflow: "hidden",
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
  priceInputContainer: {
    flexDirection: "row",
    marginBottom: Theme.spacing.md,
  },
  priceInput: {
    flex: 1,
    backgroundColor: Theme.colors.neutral.background,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
  },
  priceInputLabel: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.neutral.darkGray,
    marginBottom: Theme.spacing.xs,
  },
  priceInputField: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
  },
  priceInputDivider: {
    width: Theme.spacing.md,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  countSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  countButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: Theme.colors.neutral.lightGray,
  },
  countButtonText: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.neutral.white,
  },
  countText: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.neutral.black,
    marginHorizontal: Theme.spacing.lg,
    minWidth: 30,
    textAlign: "center",
  },
  amenityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral.lightGray,
  },
  amenityText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.neutral.black,
  },
  footer: {
    flexDirection: "row",
    padding: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.neutral.lightGray,
  },
  resetButton: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  applyButton: {
    flex: 2,
  },
});
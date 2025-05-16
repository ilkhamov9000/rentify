import React, { useState, useRef } from "react";
import { StyleSheet, View, FlatList, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import Theme from "@/constants/theme";

interface ImageCarouselProps {
  images: string[];
  height?: number;
  onImagePress?: (index: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ImageCarousel({ 
  images, 
  height = 300,
  onImagePress
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    const roundIndex = Math.round(
      event.nativeEvent.contentOffset.x / slideSize
    );
    
    setActiveIndex(roundIndex);
  };

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < images.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const handleImagePress = (index: number) => {
    if (onImagePress) {
      onImagePress(index);
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable 
            style={[styles.slide, { width: SCREEN_WIDTH }]}
            onPress={() => handleImagePress(index)}
          >
            <Image
              source={{ uri: item }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
          </Pressable>
        )}
      />
      
      {images.length > 1 && (
        <>
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
          
          {activeIndex > 0 && (
            <Pressable style={[styles.navButton, styles.prevButton]} onPress={handlePrevious}>
              <ChevronLeft size={24} color={Theme.colors.neutral.white} />
            </Pressable>
          )}
          
          {activeIndex < images.length - 1 && (
            <Pressable style={[styles.navButton, styles.nextButton]} onPress={handleNext}>
              <ChevronRight size={24} color={Theme.colors.neutral.white} />
            </Pressable>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  slide: {
    height: "100%",
  },
  image: {
    flex: 1,
  },
  pagination: {
    position: "absolute",
    bottom: Theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Theme.colors.neutral.white,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  navButton: {
    position: "absolute",
    top: "50%",
    marginTop: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  prevButton: {
    left: Theme.spacing.md,
  },
  nextButton: {
    right: Theme.spacing.md,
  },
});
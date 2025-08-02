import Logo from "@/assets/images/logo.svg";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SlideData from "./SlideData";
import LogoComponent from "@/components/LogoComponent";

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < SlideData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("Onboarding2");
    }
  };

  const handleSkip = () => {
    router.replace("Onboarding2");
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {SlideData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Skip and Next Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex === SlideData.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <ImageBackground source={item.image} style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
    </ImageBackground>
  );

  return (
    // <SafeAreaView style={styles.safeArea}>
    <View>
      {/* Header Section */}
      {/* <View style={styles.header}>
      <Logo width={36} height={38} />
      <Text style={styles.subtitle}> IlmPro</Text>
    </View> */}
      <LogoComponent logoTitleStyle={{ color: "#fff", fontSize: 27 }} />
      {/* FlatList for Onboarding Slides */}
      <FlatList
        data={SlideData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / Dimensions.get("window").width
          );
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      {/* Footer for Dots and Navigation Buttons */}
      {renderFooter()}
    </View>
    //</SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0C3E35",
  },
  slide: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 45,
    zIndex: 10, // Ensures header stays above the slider
    width: "100%",
  },

  // logo: {
  //   width: 36,
  //   height: 38,
  //   resizeMode: 'contain',
  //   marginRight: 8,
  // },
  subtitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 41,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginTop: 600,
    textAlign: "center",
    lineHeight: 36,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    height: 4,
    width: 22,
    borderRadius: 4,
    backgroundColor: "#FFFFFF59",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  skipButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 70,
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 70,
  },
  nextText: {
    color: "#0C3E35",
    fontSize: 16,
  },
});

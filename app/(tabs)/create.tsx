import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "@/assets/styles/create.styles";
import { API_URL } from "@/constants/api";
import COLORS from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

const Create: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [rating, setRating] = useState<number>(3);
  const [image, setImage] = useState<string | null>(null); // To display the selected image
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  // BASE64 is a way to transform the image as a string so it can be easily sent over the internet
  const [loading, setLoading] = useState<boolean>(false);

  const { token } = useAuthStore();
  const router = useRouter();

  const pickImage = async (): Promise<void> => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "We need camera roll permission to upload an image"
          );
          return;
        }
      }
      // Launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Lower the quality for small base64 string
        base64: true,
      });

      // If the user did not cancel
      if (!result.canceled) {
        // result.assets is defined when not canceled
        const asset = result.assets[0];
        setImage(asset.uri);
        // Use the provided base64 string if available, otherwise convert
        if (asset.base64) {
          setImageBase64(asset.base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "There was a problem selecting your image");
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!title || !caption || !imageBase64 || !image || !rating) {
      Alert.alert("Error", "Please provide all fields");
      return;
    }

    try {
      setLoading(true);

      // Get file extension from URI or default to jpg
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType
        ? `image/${fileType.toLowerCase()}`
        : "image/jpeg";

      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      const response = await fetch(`${API_URL}/api/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      Alert.alert("Success", data.message);

      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);

      router.push("/");
    } catch (error: any) {
      console.error("Error creating post:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderRatingPicker = (): JSX.Element => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
          activeOpacity={0.8}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#F4B400" : COLORS.textSecondary}
            onPress={() => setRating(i)}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>
              Share your favorite reads with others
            </Text>
          </View>
          <View style={styles.form}>
            {/* BOOK TITLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={(text: string) => setTitle(text)}
                />
              </View>
            </View>
            {/* RATING */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderRatingPicker()}
            </View>
            {/* IMAGE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.imagePicker}
                activeOpacity={0.8}
              >
                {/* If there is an image, display it */}
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.placeholderText}>
                      Tap to select an image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {/* CAPTION */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={(text: string) => setCaption(text)}
                multiline
                textAlignVertical="top"
              />
            </View>
            {/* SUBMIT */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Create;

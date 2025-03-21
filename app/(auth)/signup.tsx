import styles from "@/assets/styles/signup.styles";
import COLORS from "@/constants/colors";
import useKeyboardOffsetHeight from "@/hooks/useKeyboardOffsetHeight";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    if (keyboardOffsetHeight <= 0) {
      animatedValue.value = withTiming(0, {
        duration: 500,
      });
    } else {
      animatedValue.value = withTiming(-keyboardOffsetHeight * 0.01, {
        duration: 500,
      });
    }
  }, [keyboardOffsetHeight]);

  const handleSignUp = async () => {
    try {
    } catch (error) {}
  };
  return (
    <Animated.ScrollView
      bounces={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
      style={[{ transform: [{ translateY: animatedValue }] }]}
    >
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>BookWorm🐛</Text>
          <Text style={styles.subtitle}>Share your favorite reads</Text>
        </View>
        <View style={styles.formContainer}>
          {/* USERNAME */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Johndoe"
                placeholderTextColor={COLORS.placeholderText}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          </View>
          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="johndoe@gmail.com"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="******"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Have an account already?</Text>
            <Link href={"/signup"} asChild>
              <TouchableOpacity>
                <Text style={styles.link}>login In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default SignUp;

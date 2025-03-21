import styles from "@/assets/styles/login.styles";
import COLORS from "@/constants/colors";
import useKeyboardOffsetHeight from "@/hooks/useKeyboardOffsetHeight";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

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

  const handleLogin = async () => {
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
      {/* ILLUSTRATION */}
      <View style={styles.topIllustration}>
        <Image
          source={require("@/assets/images/i.png")}
          style={styles.illustrationImage}
          contentFit="contain"
        />
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href={"/signup"} asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  );
};

export default Login;

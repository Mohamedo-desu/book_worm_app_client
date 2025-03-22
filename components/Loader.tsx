import styles from "@/assets/styles/home.styles";
import COLORS from "@/constants/colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = ({ size = "large" }) => {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  );
};

export default Loader;

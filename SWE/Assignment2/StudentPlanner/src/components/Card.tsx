import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { COLORS, RADIUS, SHADOWS } from "../theme";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glow?: boolean;
}

// Reusable card component used across multiple screens
const Card: React.FC<CardProps> = ({ children, style, glow = false }) => {
  return (
    <View style={[styles.card, glow && styles.glow, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  glow: {
    ...SHADOWS.medium,
  },
});

export default Card;

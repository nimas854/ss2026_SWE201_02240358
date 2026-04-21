import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 700;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.screen}>
        <View style={styles.headerBlock}>
          <ThemedText style={styles.eyebrow}>MY TASKS</ThemedText>
          <ThemedText type="title" style={styles.title}>
            To-Do List Home
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Manage your daily tasks with a responsive layout that adjusts on
            phones, tablets, and landscape mode.
          </ThemedText>
        </View>

        <View style={[styles.cardRow, isWide && styles.cardRowWide]}>
          <ThemedView style={[styles.infoCard, isWide && styles.infoCardWide]}>
            <ThemedText style={styles.cardTitle}>Pending Tasks</ThemedText>
            <ThemedText style={styles.cardText}>
              1. Complete responsive UI practical report. {"\n"}
              2. Add screenshots for phone and tablet layout. {"\n"}
              3. Review navigation flow.
            </ThemedText>
          </ThemedView>
          <ThemedView style={[styles.infoCard, isWide && styles.infoCardWide]}>
            <ThemedText style={styles.cardTitle}>Completed Today</ThemedText>
            <ThemedText style={styles.cardText}>
              1. Installed navigation dependencies. {"\n"}
              2. Built responsive card layouts. {"\n"}
              3. Fixed route typing issues.
            </ThemedText>
          </ThemedView>
        </View>

        <View style={[styles.actionRow, isWide && styles.actionRowWide]}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              isWide && styles.buttonWide,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/(tabs)/explore")}
          >
            <ThemedText style={styles.primaryButtonText}>
              Open Task Board
            </ThemedText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              isWide && styles.buttonWide,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/modal")}
          >
            <ThemedText style={styles.secondaryButtonText}>
              Quick Add (Modal)
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 20,
  },
  headerBlock: {
    gap: 8,
  },
  eyebrow: {
    letterSpacing: 1,
    fontSize: 12,
    fontWeight: "700",
    color: "#0A7EA4",
  },
  title: {
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.85,
  },
  cardRow: {
    gap: 12,
  },
  cardRowWide: {
    flexDirection: "row",
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D0E8F0",
    shadowColor: "#0A7EA4",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  infoCardWide: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.85,
  },
  actionRow: {
    gap: 12,
  },
  actionRowWide: {
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: "#0A7EA4",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#0A7EA4",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#0A7EA4",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonWide: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});

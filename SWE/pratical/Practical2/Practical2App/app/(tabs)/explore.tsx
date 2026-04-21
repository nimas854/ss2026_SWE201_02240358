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

export default function TabTwoScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 700;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.screen}>
        <View style={styles.headerBlock}>
          <ThemedText style={styles.eyebrow}>TASK BOARD</ThemedText>
          <ThemedText type="title" style={styles.title}>
            To-Do Progress
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Track progress using sections that stay readable across different
            screen sizes.
          </ThemedText>
        </View>

        <View style={[styles.sectionRow, isWide && styles.sectionRowWide]}>
          <ThemedView
            style={[styles.sectionCard, isWide && styles.sectionCardWide]}
          >
            <ThemedText style={styles.sectionTitle}>In Progress</ThemedText>
            <ThemedText style={styles.sectionText}>
              1. Prepare viva answers. {"\n"}
              2. Polish Explore screen design. {"\n"}
              3. Push project to repository.
            </ThemedText>
          </ThemedView>

          <ThemedView
            style={[styles.sectionCard, isWide && styles.sectionCardWide]}
          >
            <ThemedText style={styles.sectionTitle}>Done</ThemedText>
            <ThemedText style={styles.sectionText}>
              1. Implemented responsive breakpoints. {"\n"}
              2. Added responsive button rows. {"\n"}
              3. Verified no TypeScript errors.
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
            onPress={() => router.push("/")}
          >
            <ThemedText style={styles.primaryButtonText}>
              Back to To-Do Home
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
              Open Modal
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
  sectionRow: {
    gap: 12,
  },
  sectionRowWide: {
    flexDirection: "row",
  },
  sectionCard: {
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
  sectionCardWide: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  sectionText: {
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnimationsScreen from '../screens/AnimationsScreen';
import { COLORS, RADIUS } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Categories → Detail flow
const CategoriesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.surface },
      headerTintColor: COLORS.text,
      headerTitleStyle: { fontWeight: '700' },
      cardStyle: { backgroundColor: COLORS.background },
      // Custom card transition animation
      cardStyleInterpolator: ({ current, layouts }) => ({
        cardStyle: {
          opacity: current.progress,
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width * 0.3, 0],
              }),
            },
          ],
        },
      }),
    }}
  >
    <Stack.Screen name="SubjectList" component={CategoriesScreen} options={{ title: 'Subjects' }} />
    <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Subject Detail' }} />
  </Stack.Navigator>
);

// Tab icon helper
const TabIcon = ({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) => (
  <View style={styles.tabIcon}>
    <Text style={{ fontSize: focused ? 22 : 18 }}>{emoji}</Text>
    <Text style={[styles.tabLabel, focused && { color: COLORS.primary }]}>{label}</Text>
  </View>
);

// Main tab navigator
const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface, shadowColor: 'transparent', borderBottomWidth: 0 },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '800', fontSize: 20 },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Student Planner',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon emoji="📚" label="Subjects" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Animations"
        component={AnimationsScreen}
        options={{
          title: 'Animations',
          tabBarIcon: ({ focused }) => <TabIcon emoji="✨" label="Demos" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" label="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabIcon: { alignItems: 'center', justifyContent: 'center' },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
});

export default AppNavigator;

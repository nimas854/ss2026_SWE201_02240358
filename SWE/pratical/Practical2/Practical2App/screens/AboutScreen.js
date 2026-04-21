import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Screen</Text>
      <Text style={styles.text}>
        This app was built using React Native and Expo.
        It demonstrates basic screen navigation.
      </Text>
      <Button
        title="Go Back to Home"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0e8f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4a235a',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
});

export default AboutScreen;

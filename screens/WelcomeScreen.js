import React from 'react';
import {StyleSheet, Platform, Text, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SetupProfile from '../components/SetupProfile';

function WelcomeScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <Text style={styles.title}>welcome</Text>
        <Text style={styles.description}>setting your profile</Text>
        <SetupProfile />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
  },
  description: {
    marginTop: 10,
    fontSize: 24,
    color: '#757575',
  },
});

// App.js

import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Home from './Home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}

// The SafeAreaView component ensures that the content of the app is rendered within the safe area of the device, which takes into 
// account any notches, tabs, or other screen elements that may obstruct the view.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

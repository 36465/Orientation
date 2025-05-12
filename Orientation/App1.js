import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [number, setNumber] = useState(1);

  const changenumber = () => {
    setNumber(prev => prev < 5 ? prev + 1 : 1);
  };

  useEffect(() => {
    const orientationLocks = [
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
      ScreenOrientation.OrientationLock.PORTRAIT_DOWN,
      ScreenOrientation.OrientationLock.LANDSCAPE,
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
    ];
    
    if (number >= 1 && number <= 5) {
      ScreenOrientation.lockAsync(orientationLocks[number - 1]);
    }
  }, [number]);

  const orientationMessages = {
    1: "PORTRAIT_UP",
    2: "PORTRAIT_DOWN",
    3: "LANDSCAPE",
    4: "LANDSCAPE_LEFT",
    5: "LANDSCAPE_RIGHT",
  };

  const backgroundColors = [
    'darkred',
    'skyblue',
    'lightgrey',
    'lightgreen',
    'violet'
  ];

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={changenumber} style={styles.header}>
        <Text style={styles.buttonText}>
          Change Orientation (Current: {number})
        </Text>
      </Pressable>

      <View style={[styles.contentContainer, { backgroundColor: backgroundColors[number - 1] }]}>
        <Text style={styles.orientationText}>
          THIS APP IS CURRENTLY IN '{orientationMessages[number]}' ORIENTATION
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    padding: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  orientationText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    margin: 20
  }
});
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Pressable, Button } from 'react-native';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import * as ScreenOrientation from 'expo-screen-orientation';


// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
    const video = React.useRef(null);
  const [number, setNumber] = useState(1);
    const [status, setStatus] = React.useState({});

  const changenumber = () => {
    if (number < 2) {
      setNumber(number + 1);
    } else {
      setNumber(1);
    }
  };

  React.useEffect(() => {
    if (number === 1) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
      else if (number === 2) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    } else {null}
  }, [number]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => changenumber()}>
        <Text style={styles.paragraph3}>
          Pressing this number ({number}) should change the Orientation.
        </Text>
      </Pressable>
   
      <View style={styles.container3}>
        <Text style={styles.paragraph}>
       This is a place where you could have a description of the video or some other information. Because the App is in "Portrait" the video can only use the width of the screen. Therefore there is a lot of left over space that can be used. 
        </Text>
        </View>
        <View style={styles.container3}>
         <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    
          <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
      container3: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 2,
  },
  paragraph: {
    margin: 4,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    paragraph3: {
    padding: 30,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    video: {
    alignSelf: 'center',
    width: 349,
    height: 220,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
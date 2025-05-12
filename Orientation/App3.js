import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import { Video } from 'expo-av';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const App = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
    console.log(dimensions);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  return (
    <View style={styles.container}>
  
      {dimensions.window.width > dimensions.window.height ? (
        <View style={styles.container3}>
          <Text>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
          </Text>
          <Text
            style={
              styles.paragraph
            }>{`Window Dimensions: height - ${dimensions.window.height} is smaller than width - ${Math.round(dimensions.window.width)}`}</Text>
          <Text style={styles.paragraph}>
            This is a place where you could have a description of the video or
            some other information. Because the App is in "Portrait" the video
            can only use the width of the screen. Therefore there is a lot of
            left over space that can be used. When the phone is in LANDSCAPE View:    {'\n'}{'\n'}1. The Video should be taking up the whole screen.
          </Text>

          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />

          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>
        </View>
      ) : (
        <View>
        <Text
          style={
            styles.paragraph
          }>{`Window Dimensions: height - ${Math.round(dimensions.window.height)} is bigger than width - ${dimensions.window.width}`}</Text>
          <Text style={
            styles.paragraph
          }>When the phone is in Portrait View:    {'\n'}{'\n'}1. You should have a text at the top of the screen that showcases the name of the video.   {'\n'}{'\n'}2. Then in the middle you should have the Video. {'\n'}{'\n'}3. Then at the bottom you should have a paragraph description of the Video{'\n'}{'\n'}4. Try to make the sections above and below the videos look nice with text making good use of the space</Text></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  video: {
    alignSelf: 'center',
    width: 350,
    height: 220,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

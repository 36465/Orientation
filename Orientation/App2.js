import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
    const video = useRef(null);
    const [orientation, setOrientation] = useState(1);
    const [status, setStatus] = useState({});
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    const toggleOrientation = () => {
        setOrientation(prev => prev === 1 ? 2 : 1);
    };

    useEffect(() => {
        if (orientation === 1) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }, [orientation]);

    const isLandscape = orientation === 1;
    const buttonPanelWidth = 100;

    return (
        <View style={styles.container}>
            {!isLandscape && (
                <View style={styles.descriptionContainer}>
                    <Button
                        title="Video Description"
                        color="#666"
                    />
                </View>
            )}

            <View style={isLandscape ? styles.landscapeContent : styles.portraitContent}>
                <View style={isLandscape ? styles.landscapeVideoContainer : styles.portraitVideoContainer}>
                    <Video
                        ref={video}
                        style={[
                            styles.videoBase,
                            {
                                width: isLandscape 
                                    ? dimensions.width - buttonPanelWidth
                                    : dimensions.width,
                                height: isLandscape
                                    ? (dimensions.width - buttonPanelWidth) * (9/16)
                                    : dimensions.width * (9/16)
                            }
                        ]}
                        source={{
                            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={setStatus}
                    />
                </View>

                <View style={isLandscape ? styles.landscapeButtons : styles.portraitButtons}>
                    <Button
                        title={status.isPlaying ? 'Pause' : 'Play'}
                        onPress={() =>
                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }
                    />
                    <Button
                        title="Toggle"
                        onPress={toggleOrientation}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    descriptionContainer: {
        padding: 10,
        backgroundColor: '#fff',
    },
    landscapeContent: {
        flex: 1,
        flexDirection: 'row',
    },
    portraitContent: {
        flex: 1,
    },
    landscapeVideoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    portraitVideoContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    videoBase: {
        backgroundColor: '#000',
    },
    landscapeButtons: {
        width: 100,
        justifyContent: 'center',
        padding: 10,
    },
    portraitButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        gap: 20,
    },
});
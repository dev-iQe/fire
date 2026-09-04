import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';

export default function VideoPlayer({ videoUrl }) {
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [quality, setQuality] = useState('1080p');

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <View style={styles.controlsBar}>
        <TouchableOpacity style={styles.controlBtn} onPress={() => setSubtitlesEnabled(!subtitlesEnabled)}>
          <Text style={styles.controlText}>الترجمة: {subtitlesEnabled ? 'مفعلة' : 'متوقفة'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={() => setQuality(quality === '1080p' ? '720p' : '1080p')}>
          <Text style={styles.controlText}>الدقة: {quality}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: Dimensions.get('window').width, height: 250, backgroundColor: '#000' },
  video: { flex: 1 },
  controlsBar: { flexDirection: 'row', justifyContent: 'space-around', padding: 8, backgroundColor: 'rgba(0,0,0,0.6)' },
  controlText: { color: '#fff', fontSize: 12 }
});

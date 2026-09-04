import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { fetchMovies } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';

export default function TrailerScreen({ navigation }) {
  const { theme } = useTheme();
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    fetchMovies('top_rated').then(setTrailers);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Trailers & Clips</Text>
      <FlatList
        data={trailers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.trailerCard}>
            <VideoPlayer videoUrl="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" />
            <View style={styles.infoRow}>
              <Text style={[styles.movieName, { color: theme.colors.text }]}>{item.title}</Text>
              <TouchableOpacity 
                style={styles.watchBtn}
                onPress={() => navigation.navigate('Details', { movie: item })}
              >
                <Text style={styles.watchBtnText}>Watch Full</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  trailerCard: { marginBottom: 20, borderRadius: 12, overflow: 'hidden', backgroundColor: '#1e293b' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
  movieName: { fontSize: 16, fontWeight: '600', flex: 1 },
  watchBtn: { backgroundColor: '#3b82f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  watchBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});

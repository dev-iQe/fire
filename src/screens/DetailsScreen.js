import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { fetchMovieDetails } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsScreen({ route }) {
  const { movie } = route.params;
  const { theme } = useTheme();
  const [details, setDetails] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetchMovieDetails(movie.id).then(setDetails);
  }, [movie.id]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {playing ? (
        <VideoPlayer videoUrl="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" />
      ) : (
        <ImageBackground 
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}` }} 
          style={styles.heroImage}
        >
          <TouchableOpacity style={styles.playOverlay} onPress={() => setPlaying(true)}>
            <Ionicons name="play-circle" size={70} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      )}

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{movie.title || movie.name}</Text>
        <Text style={styles.meta}>{movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average?.toFixed(1)}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setPlaying(true)}>
            <Ionicons name="play" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.primaryBtnText}>Watch now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Ionicons name="bookmark-outline" size={18} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Ionicons name="download-outline" size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Storyline</Text>
        <Text style={[styles.overview, { color: theme.colors.subtext }]}>{movie.overview || 'No description available.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroImage: { width: Dimensions.get('window').width, height: 300, justifyContent: 'center', alignItems: 'center' },
  playOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 50 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  meta: { color: '#94a3b8', fontSize: 14, marginBottom: 15 },
  actionButtons: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  primaryBtn: { flex: 1, backgroundColor: '#3b82f6', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 12, marginRight: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 8 },
  overview: { fontSize: 14, lineHeight: 22 }
});

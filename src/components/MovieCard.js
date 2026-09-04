import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
        style={styles.poster} 
      />
      <Text style={styles.title} numberOfLines={1}>{movie.title || movie.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 110, marginRight: 12 },
  poster: { width: 110, height: 160, borderRadius: 12, backgroundColor: '#333' },
  title: { color: '#fff', fontSize: 13, marginTop: 6, textAlign: 'center' }
});

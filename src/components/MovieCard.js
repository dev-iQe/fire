// src/components/MovieCard.js
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.posterWrap}>
        <Image
          source={{ uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined }}
          style={styles.poster}
        />
        {rating ? (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {rating}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={1}>{movie.title || movie.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 130, marginRight: 14 },
  posterWrap: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#1e293b' },
  poster: { width: 130, height: 190, borderRadius: 16 },
  ratingBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8
  },
  ratingText: { color: '#facc15', fontSize: 11, fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 13, marginTop: 8, fontWeight: '500' }
});

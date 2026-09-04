// src/components/MovieCard.js
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{movie.title || movie.name}</Text>
        <View style={styles.metaRow}>
          {year ? <Text style={styles.metaText}>{year}</Text> : null}
          {rating ? (
            <View style={styles.imdbBadge}>
              <Text style={styles.imdbText}>IMDb {rating}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 140, marginRight: 14 },
  poster: { width: 140, height: 200, borderRadius: 14, backgroundColor: '#1c2431' },
  info: { marginTop: 8 },
  title: { color: '#fff', fontSize: 14, fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { color: '#94a3b8', fontSize: 12, marginRight: 8 },
  imdbBadge: { backgroundColor: '#facc15', paddingHorizontal: 5, paddingVertical: 1, borderRadius: 4 },
  imdbText: { color: '#000', fontSize: 10, fontWeight: '700' },
});

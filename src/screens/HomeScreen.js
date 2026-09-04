// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../services/api';
import { useTabBarVisibility } from '../context/TabBarVisibilityContext';

const CATEGORIES = ['Most Watched', 'For Kids', 'Family Fun', 'Action'];

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('Most Watched');
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const { handleScroll } = useTabBarVisibility();

  const loadData = () => {
    setLoading(true);
    setLoadError(null);
    Promise.all([
      fetchMovies('popular'),
      fetchMovies('top_rated'),
    ])
      .then(([popularData, topRatedData]) => {
        setMovies(popularData);
        setSeries(topRatedData);
      })
      .catch((err) => setLoadError(err.message || String(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.screen}>
      <Header
        onSettingsPress={() => navigation.navigate('Settings')}
        onSearchPress={() => {}}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow} contentContainerStyle={{ paddingHorizontal: 20 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, activeCategory === cat && styles.catChipActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loadError ? (
        <View style={styles.section}>
          <Text style={styles.errorText}>Failed to load: {loadError}</Text>
          <TouchableOpacity onPress={loadData} style={styles.retryBtn}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {loading ? (
        <ActivityIndicator color="#f97316" style={{ marginTop: 40 }} size="large" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Movies</Text>
            <FlatList
              data={movies}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={({ item }) => (
                <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movie: item })} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Series</Text>
            <FlatList
              data={series}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={({ item }) => (
                <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movie: item })} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <View style={{ height: 30 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b0f19' },
  catRow: { marginTop: 15, flexGrow: 0 },
  catChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#1c2431', marginRight: 10,
  },
  catChipActive: { backgroundColor: '#f97316' },
  catText: { color: '#94a3b8', fontWeight: '600', fontSize: 13 },
  catTextActive: { color: '#fff' },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  errorText: { color: '#ef4444', fontSize: 14, marginBottom: 10 },
  retryBtn: { backgroundColor: '#f97316', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignSelf: 'flex-start' },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { fetchMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchMovies('popular').then(setPopular);
    fetchMovies('upcoming').then(setUpcoming);
  }, []);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length > 2) {
      const results = await searchMovies(text);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header onSettingsPress={() => navigation.navigate('Settings')} />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#94a3b8"
          style={[styles.searchInput, { color: theme.colors.text, backgroundColor: theme.colors.card }]}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {searchResults.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Search Results</Text>
          <FlatList
            data={searchResults}
            horizontal
            renderItem={({ item }) => <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movie: item })} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : (
        <>
          {/* Hero Banner */}
          <View style={styles.heroContainer}>
            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Discover Your Next Favorite Movie.</Text>
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
            {['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi'].map((cat, idx) => (
              <TouchableOpacity 
                key={idx} 
                style={[styles.catChip, activeCategory === cat && styles.activeCatChip]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.catText, activeCategory === cat && styles.activeCatText]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Latest Movies */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Latest movies</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
            <FlatList
              data={popular}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movie: item })} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          {/* Upcoming Movies */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming</Text>
            <FlatList
              data={upcoming}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <MovieCard movie={item} onPress={() => navigation.navigate('Details', { movie: item })} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 30 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginVertical: 10 },
  searchIcon: { position: 'absolute', left: 15, zIndex: 1 },
  searchInput: { flex: 1, height: 45, borderRadius: 22, paddingLeft: 45, paddingRight: 20, fontSize: 14 },
  heroContainer: { paddingHorizontal: 20, marginVertical: 15 },
  heroTitle: { fontSize: 26, fontWeight: 'bold', lineHeight: 34 },
  categoriesRow: { paddingHorizontal: 20, marginVertical: 10 },
  catChip: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1e293b', marginRight: 10 },
  activeCatChip: { backgroundColor: '#3b82f6' },
  catText: { color: '#94a3b8', fontWeight: '600' },
  activeCatText: { color: '#fff' },
  section: { marginTop: 20, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  seeAll: { color: '#3b82f6', fontSize: 14 }
});

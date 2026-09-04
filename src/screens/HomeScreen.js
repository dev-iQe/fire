import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { fetchLatestMovies, fetchUpcomingMovies, searchMovies } from '../services/api';

export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const [latestMovies, setLatestMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Action', 'Drama', 'Comedy', 'Science'];

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const latest = await fetchLatestMovies();
      const upcoming = await fetchUpcomingMovies();
      setLatestMovies(latest || []);
      setUpcomingMovies(upcoming || []);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = await searchMovies(text);
    setSearchResults(results || []);
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.movieCard}
      onPress={() => navigation.navigate('Details', { movie: item })}
    >
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
        style={styles.moviePoster} 
      />
      <Text style={[styles.movieTitle, { color: isDarkMode ? '#fff' : '#000' }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.movieSubText}>
        {item.release_date ? item.release_date.substring(0, 4) : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#0f1016' : '#fff' }]}>
      {/* رأس الصفحة المطابق للتصميم (البروفايل والترحيب وأزرار البحث والإشعارات) */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500' }} 
            style={styles.avatar} 
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={[styles.userName, { color: isDarkMode ? '#fff' : '#000' }]}>William Krisna</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={20} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="notifications-outline" size={20} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* عنوان الاكتشاف */}
      <Text style={[styles.discoverTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
        Discover Your Next{'\n'}Favorite Movie.
      </Text>

      {/* شريط البحث السريع داخل الصفحة */}
      <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#1f222a' : '#f1f1f1' }]}>
        <Ionicons name="search" size={20} color="#717171" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search movies..." 
          placeholderTextColor="#717171"
          style={[styles.searchInput, { color: isDarkMode ? '#fff' : '#000' }]}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* الفئات (Categories) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.categoryChip, 
              selectedCategory === cat && styles.selectedCategoryChip
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryText, 
              selectedCategory === cat ? { color: '#fff' } : { color: '#9e9e9e' }
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#f97316" style={{ marginTop: 40 }} />
      ) : (
        <>
          {/* قسم Latest Movies */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Latest movies</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList 
            data={searchQuery.trim() === '' ? latestMovies : searchResults}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          {/* قسم Upcoming */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Upcoming</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList 
            data={upcomingMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  welcomeText: { fontSize: 12, color: '#9e9e9e' },
  userName: { fontSize: 16, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderWidth: 1, borderColor: '#222' },
  discoverTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, lineHeight: 34 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 15, height: 48, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  categoriesContainer: { flexDirection: 'row', marginBottom: 25 },
  categoryChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 10, backgroundColor: '#1f222a' },
  selectedCategoryChip: { backgroundColor: '#3b82f6' },
  categoryText: { fontWeight: '600', fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAllText: { color: '#3b82f6', fontSize: 14 },
  horizontalList: { paddingBottom: 20 },
  movieCard: { width: 130, marginRight: 15 },
  moviePoster: { width: 130, height: 180, borderRadius: 12, backgroundColor: '#222' },
  movieTitle: { fontSize: 14, fontWeight: '600', marginTop: 8 },
  movieSubText: { fontSize: 12, color: '#9e9e9e', marginTop: 2 }
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onSettingsPress }) {
  const { theme } = useTheme();
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.fireLogoContainer} onPress={onSettingsPress}>
        <FontAwesome5 name="fire" size={24} color="#ffffff" />
        <Text style={styles.tvText}>Tv</Text>
      </TouchableOpacity>
      <View style={styles.rightIcons}>
        <Ionicons name="search" size={24} color={theme.colors.text} style={{ marginRight: 15 }} />
        <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10 },
  fireLogoContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f97316', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1.5, borderColor: '#000' },
  tvText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 4 },
  rightIcons: { flexDirection: 'row', alignItems: 'center' }
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onSearchPress, onNotificationPress }) {
  const { isDarkMode } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.fireLogoContainer}>
        <FontAwesome5 name="fire" size={24} color="#f97316" />
        <Text style={[styles.tvText, { color: isDarkMode ? '#fff' : '#000' }]}>Tv</Text>
      </View>

      <View style={styles.rightIcons}>
        {onSearchPress && (
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
            <Ionicons name="search" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        )}
        {onNotificationPress && (
          <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  fireLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tvText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
});

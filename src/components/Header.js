// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function Header({ onSearchPress, onSettingsPress }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoRow}>
        <FontAwesome5 name="fire" size={20} color="#f97316" />
        <Text style={styles.logoText}>
          Prime<Text style={{ color: '#f97316' }}>Vision</Text>
        </Text>
      </View>

      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconBtn} onPress={onSettingsPress}>
          <Feather name="sliders" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onSearchPress}>
          <Ionicons name="search" size={18} color="#fff" />
        </TouchableOpacity>
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
    paddingTop: 15,
    paddingBottom: 5,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoText: { color: '#fff', fontSize: 19, fontWeight: '700', marginLeft: 8 },
  rightIcons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#1c2431',
    justifyContent: 'center', alignItems: 'center',
    marginLeft: 10,
  },
});

import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { theme, toggleTheme, isDarkMode, language, changeLanguage } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.brandHeader}>
        <View style={styles.fireLogoContainer}>
          <FontAwesome5 name="fire" size={28} color="#ffffff" />
          <Text style={styles.tvText}>Tv</Text>
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>الإعدادات (Settings)</Text>
      </View>

      <View style={[styles.settingItem, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.settingText, { color: theme.colors.text }]}>الوضع الليلي (Dark Mode)</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <View style={[styles.settingItem, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.settingText, { color: theme.colors.text }]}>تفعيل إشعارات الأفلام والتذكير اليومي</Text>
        <Switch value={true} onValueChange={() => {}} />
      </View>

      <View style={[styles.settingItem, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.settingText, { color: theme.colors.text }]}>لغة التطبيق (Language)</Text>
        <TouchableOpacity onPress={() => changeLanguage(language === 'ar' ? 'en' : 'ar')}>
          <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>{language === 'ar' ? 'العربية 🇸🇦' : 'English 🇺🇸'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialContainer}>
        <Text style={[styles.socialTitle, { color: theme.colors.text }]}>تواصل معي عبر حساباتي:</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/eng_azawy')}>
            <Ionicons name="logo-instagram" size={32} color="#E1306C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://tiktok.com/@eng_azawy')}>
            <Ionicons name="logo-tiktok" size={32} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://snapchat.com/add/eng_azawy')}>
            <Ionicons name="logo-snapchat" size={32} color="#FFFC00" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://t.me/bavarite')}>
            <Ionicons name="paper-plane" size={32} color="#229ED9" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  brandHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 40 },
  fireLogoContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f97316', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1.5, borderColor: '#000' },
  tvText: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 15 },
  settingText: { fontSize: 15 },
  socialContainer: { marginTop: 20, alignItems: 'center' },
  socialTitle: { fontSize: 16, marginBottom: 15, fontWeight: '600' },
  socialIcons: { flexDirection: 'row', justifyContent: 'space-around', width: '80%' }
});

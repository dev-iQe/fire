import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

// مؤقت: عشان نشوف رسالة أي خطأ JS بدل ما التطبيق يقفل على طول من غير توضيح
if (global.ErrorUtils) {
  const defaultHandler = global.ErrorUtils.getGlobalHandler();
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    Alert.alert(
      isFatal ? 'خطأ فادح (Fatal)' : 'خطأ',
      String(error?.message || error) + '\n\n' + String(error?.stack || ''),
      [{ text: 'OK' }]
    );
    // بعد ما تاخد سكرين شوت للرسالة، امسح السطر ده لو عايز السلوك الافتراضي يرجع
    // defaultHandler(error, isFatal);
  });
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

// src/navigation/LiquidTabBar.js
import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTabBarVisibility } from '../context/TabBarVisibilityContext';

const ICONS = {
  Home: 'home',
  Trailer: 'compass',
  Saved: 'heart',
  Download: 'person',
};

function TabItem({ route, isFocused, onPress }) {
  const scale = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: true,
      friction: 7,
      tension: 80,
    }).start();
  }, [isFocused]);

  const iconName = isFocused ? ICONS[route.name] : `${ICONS[route.name]}-outline`;

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.pill,
          {
            opacity: scale,
            transform: [{ scale: scale.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }],
          },
        ]}
      />
      <Ionicons name={iconName} size={22} color={isFocused ? '#fff' : '#9aa5b1'} />
    </TouchableOpacity>
  );
}

export default function LiquidTabBar({ state, navigation }) {
  const { translateY } = useTabBarVisibility();

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ translateY }] }]}>
      <BlurView intensity={60} tint="dark" style={styles.blur}>
        <View style={styles.overlay} />
        <View style={styles.row}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return <TabItem key={route.key} route={route} isFocused={isFocused} onPress={onPress} />;
          })}
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  blur: { paddingVertical: 12 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Platform.OS === 'android' ? 'rgba(15,20,30,0.75)' : 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  row: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  pill: { position: 'absolute', width: 50, height: 50, borderRadius: 25, backgroundColor: '#f97316' },
});

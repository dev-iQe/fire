// src/context/TabBarVisibilityContext.js
import React, { createContext, useContext, useRef } from 'react';
import { Animated } from 'react-native';

const TabBarVisibilityContext = createContext();

export function TabBarVisibilityProvider({ children }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - lastOffset.current;

    if (currentOffset <= 10) {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 9, tension: 60 }).start();
    } else if (diff > 6) {
      Animated.spring(translateY, { toValue: 120, useNativeDriver: true, friction: 9, tension: 60 }).start();
    } else if (diff < -6) {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 9, tension: 60 }).start();
    }
    lastOffset.current = currentOffset;
  };

  return (
    <TabBarVisibilityContext.Provider value={{ translateY, handleScroll }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
}

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);

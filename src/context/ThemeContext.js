import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('ar');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const changeLanguage = (lang) => setLanguage(lang);

  const theme = {
    dark: isDarkMode,
    colors: {
      background: isDarkMode ? '#0b0f19' : '#f8fafc',
      card: isDarkMode ? '#1e293b' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#0f172a',
      subtext: isDarkMode ? '#94a3b8' : '#64748b',
      primary: '#3b82f6',
      glass: isDarkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode, language, changeLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

/* 

ThemeContext.tsx - Firebase Integration

- Automatically detects system theme
- Syncs with Firebase for logged-in users
- Falls back to AsyncStorage for non-authenticated users
- Real-time updates across devices
*/
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestoreDb } from "./firebase";
import { Colors, ThemeColors, ThemeMode } from "./theme";

type ThemeContextType = {
  colors: ThemeColors;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@app_theme_mode";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    return unsubscribe;
  }, []);

  // Load theme from Firebase or AsyncStorage
  useEffect(() => {
    if (userId) {
      // User is authenticated - use Firebase
      loadThemeFromFirebase(userId);
    } else {
      // User is not authenticated - use AsyncStorage
      loadThemeFromLocal();
    }
  }, [userId]);

  const loadThemeFromFirebase = (uid: string) => {
    const userSettingsRef = doc(
      firestoreDb,
      "users",
      uid,
      "settings",
      "preferences"
    );

    const unsubscribe = onSnapshot(
      userSettingsRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const savedTheme = data.themeMode as ThemeMode;
          if (savedTheme) {
            setThemeModeState(savedTheme);
          }
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load theme from Firebase:", error);
        // Fallback to local storage on error
        loadThemeFromLocal();
      }
    );

    return unsubscribe;
  };

  const loadThemeFromLocal = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error("Failed to load theme from AsyncStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);

    if (userId) {
      // Save to Firebase
      try {
        const userSettingsRef = doc(
          firestoreDb,
          "users",
          userId,
          "settings",
          "preferences"
        );
        await setDoc(userSettingsRef, { themeMode: mode }, { merge: true });
      } catch (error) {
        console.error("Failed to save theme to Firebase:", error);
        // Fallback to AsyncStorage if Firebase fails
        await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    } else {
      // Save to AsyncStorage for non-authenticated users
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      } catch (error) {
        console.error("Failed to save theme to AsyncStorage:", error);
      }
    }
  };

  // Determine actual theme based on mode and system preference
  const isDark =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{ colors, isDark, themeMode, setThemeMode, isLoading }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

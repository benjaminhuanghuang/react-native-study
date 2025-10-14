import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

export type ThemeContextType = {
  isSystemTheme: boolean;
  currentTheme: string;
  toggleTheme: (newTheme: string) => void;
  useSystemTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isSystemTheme: false,
  currentTheme: "light",
  toggleTheme: () => {},
  useSystemTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  const [currentTheme, setTheme] = useState<string>("light");
  const [isSystemTheme, setIsSystemTheme] = useState<boolean>(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedThemeObj = await AsyncStorage.getItem("theme");
        const savedTheme = savedThemeObj ? JSON.parse(savedThemeObj!) : null;
        if (savedTheme) {
          setTheme(savedTheme.mode);
          setIsSystemTheme(savedTheme.system);
        }
      } catch (error) {
        console.log("Error in loading theme.", error);
      }
    };

    getTheme();
  }, []);

  // Apply system theme if device theme changes
  useEffect(() => {
    if (colorScheme && isSystemTheme) {
      const themeObj = {
        mode: colorScheme,
        system: false,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObj)).catch((error) => {
        console.log("Error in saving theme.", error);
      });
      setTheme(colorScheme);
      setIsSystemTheme(true);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme: string) => {
    const themeObj = {
      mode: newTheme,
      system: false,
    };
    AsyncStorage.setItem("theme", JSON.stringify(themeObj)).catch((error) => {
      console.log("Error in saving theme.", error);
    });
    setTheme(newTheme);
    setIsSystemTheme(false);
  };

  const useSystemTheme = () => {
    if (colorScheme) {
      const themeObj = {
        mode: colorScheme,
        system: true,
      };
      AsyncStorage.setItem("theme", JSON.stringify(themeObj)).catch((error) => {
        console.log("Error in saving theme.", error);
      });
      setTheme(colorScheme);
      setIsSystemTheme(true);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, toggleTheme, useSystemTheme, isSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

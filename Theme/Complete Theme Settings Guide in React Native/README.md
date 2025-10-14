# Complete Theme Settings Guide in React Native | Dark Theme in React Native Tutorial ⭐️

<https://youtu.be/JiZVvhR63ks?si=8g-rgbsg7ORqj5Xk>

<https://github.com/itzpradip/react-native-calculator>

- Drawer navigator
- Theme Context
- Save Theme Settings with AsyncStorage
- System Theme

## Drawer nav

```sh
npm install @react-navigation/drawer react-native-gesture-handler react-native-reanimated
```

```js
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return <Drawer />
}

export default DrawerLayout;
```

## Storage

```sh
npm i @react-native-async-storage/async-storage

```

```js
const toggleTheme = (newTheme: string) => {
  setTheme(newTheme);
  AsyncStorage.setItem("theme", newTheme).catch((error) => {
    console.log("Error in saving theme.", error);
  });
};
```

## System theme

```js
import { useColorScheme } from "react-native";


export type ThemeContextType = {
  isSystemTheme: boolean;
  currentTheme: string;
  toggleTheme: (newTheme: string) => void;
  useSystemTheme: () => void;
};
```

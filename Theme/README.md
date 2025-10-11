# Expo Theme

- Theme Context

- Automatically detects system theme

- Syncs with Firebase for logged-in users

- Falls back to AsyncStorage for non-authenticated users

- Real-time updates across devices

## Get system theme

```js
import { useColorScheme } from "react-native";

const systemColorScheme = useColorScheme();

// Determine actual theme based on mode and system preference
const isDark =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";
 
```

## Tests

If working with an iOS emulator locally, you can use the Cmd ⌘ + Shift + a shortcut to toggle between light and dark modes.

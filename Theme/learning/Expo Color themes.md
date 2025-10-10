
# Color themes

<https://docs.expo.dev/develop/user-interface/color-themes/>

To configure supported appearance styles, you can use the userInterfaceStyle property in your project's app config.

Install expo-system-ui to support the appearance styles for Android

```sh
npx expo install expo-system-ui
```

```jsx
import { Appearance, useColorScheme } from 'react-native';

function MyComponent() {
  let colorScheme = useColorScheme();

   const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;

   return (
     <View style={[styles.container, themeContainerStyle]}>

     </View>
   )
}
```

## Tests

If working with an iOS emulator locally, you can use the Cmd ⌘ + Shift + a shortcut to toggle between light and dark modes.

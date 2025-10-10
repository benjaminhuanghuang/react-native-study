
# React Navigation support

<https://expo.github.io/router/docs/migration/react-navigation/themes/>

In React Navigation, you set the theme for the entire app using the <NavigationContainer /> component. Expo Router manages the root container for you, so instead you should set the theme using the ThemeProvider directly.

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';


<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="+not-found" />
    </Stack>
</ThemeProvider>
```

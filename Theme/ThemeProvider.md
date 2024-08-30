


```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';


<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="+not-found" />
    </Stack>
</ThemeProvider>
```
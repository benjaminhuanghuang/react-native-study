# Navigation Redirect

```ts
function Layout() {
  
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
```

Index.ts

```ts
import { Redirect } from "expo-router";

export default function Home() {
  return <Redirect href="/(tabs)" />;
}
```

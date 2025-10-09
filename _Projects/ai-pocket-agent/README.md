# React Native Full Stack App | Expo, Firebase and AI | AI Pocket Agent | Tubeguruji

```sh
npx create-expo-app@latest ai-pocket-agent
npm run reset-project
   - no
```

## 00:19:04 Landing Screen UI

## 00:28:58 Authentication

[Clerk](https://clerk.com/docs/expo/getting-started/quickstart)

```sh
npm i @clerk/clerk-expo expo-secure-store
```

Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY into .env

Warp the RootLayout

```js
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";


  <ClerkProvider tokenCache={tokenCache}>
   <Stack
      screenOptions={{
         headerShown: false,
      }}
   >
      <Stack.Screen name="index" />
   </Stack>
</ClerkProvider>
```

## 00:40:36 Firebase Database Setup

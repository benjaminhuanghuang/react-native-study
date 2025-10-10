# React Native Full Stack App | Expo, Firebase and AI | AI Pocket Agent | Tubeguruji

<https://www.youtube.com/watch?v=TDbsttEkidU>

```sh
npx create-expo-app@latest ai-pocket-agent
npm run reset-project
   - no
```

## 00:19:04 Landing Screen UI

app/index.tsx

## 00:28:58 Authentication

[Clerk](https://clerk.com/docs/expo/getting-started/quickstart)

[Protect content and access user data](<https://clerk.com/docs/expo/guides/users/reading>)

<https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections>

```sh
npm i @clerk/clerk-expo expo-secure-store
```

Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY into .env

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

```sh
npm i firebase
npm i -D @types/firebase
```

## 00:48:39 Tab Bar Navigation

Get icon <https://www.flaticon.com/>

## 01:26:33 Navigate One Screen to Other (Expo Router)

chat/index.tsx

## 01:51:52 Enable Free AI Models

<https://kravixstudio.com/?ref=aiagent>

## 02:15:00 Image Upload

Select Image → Upload to Firestore → Pass User msg+image url → AI Model

```js
const uploadImageToStorage = async (fileUri: string) => {
   const response = await fetch(fileUri);
   const blob = await response.blob();

   const uniqueFileName = `${Date.now()}.png`;
   const imageRef = ref(FIREBASE_STORAGE, `AI_pocket_agent/${uniqueFileName}`);

   await uploadBytes(imageRef, blob);
   const imageURL = await getDownloadURL(imageRef);
   return imageURL;
};
```

## 02:40:27 Save Chat

```js
const saveMessagesAsync = useCallback();

```

## 02:48:21 Create Custom Agent

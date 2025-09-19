# React Native Full Course 2025 | Become a React Native Pro in 4 Hours

by PedroTech

<https://github.com/machadop1407/react-native-course-habit-tracker>

```sh
npx create-expo-app .

npm run reset-project

```

## Layout and Navigation

```js
import {Link} from 'expo-router'

<Link href="/login"> Login </Link>



import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen  name="index"  options={{}} />
      <Stack.Screen name="login" options={{}} />
    </Stack>
  );
}
```

## AppWrite

```sh
npm i react-native-appwrite

```

```ts
import { Client } from "react-native-appwrite";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export { client };

```

.env

```text
EXPO_PUBLIC_APPWRITE_ENDPOINT=""
EXPO_PUBLIC_APPWRITE_PROJECT_ID=""
EXPO_PUBLIC_APPWRITE_PLATFORM=""
```

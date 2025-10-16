# Route

<https://docs.expo.dev/router/installation/>

```sh
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

npx expo install react-native-web react-dom
```

Update package.json

```json
"main": "expo-router/entry",
```

Update app.json

```json
"scheme": "workouts",
```

Update babel.config.js

Start from
/src/app/index.jsx

## Exercise Detail page

src/app/[name].tsx

```js
 const { name } = useLocalSearchParams();
```

## Layout: Using stack to support  navigation on the header

src/app/_layout.tsx

```js
<Stack>
    <Stack.Screen name="index" options={{ title: "Exercises" }} />
</Stack>
```

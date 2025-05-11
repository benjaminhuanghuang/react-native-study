# Learn Expo Router - Complete Tutorial

<https://www.youtube.com/watch?v=Z20nUdAUGmM>

<https://github.com/cosdensolutions/code/tree/master/videos/long/expo-router-tutorial>

<https://docs.expo.dev/router/installation/#quick-start>

```sh
npx create-expo-app@latest -t

# Manually
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

set entry in package.json

```json
"main": "expo-router/entry",
```

Add a deep linking scheme in your app.json:

```json
{
  "scheme": "your-app-scheme"
}
```

Modify babel.config.js

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel']    // Add this line
  };
};
```

## 2 ways for navigation

```js
<Link href="/user/1"> Go to user 1 </Link>


<Pressable onPress={()=> router.push({
  pathname: 'user/[id][]',
  params: {id: 2}
  })}> 
  <Text>Got user 2</Text>
</Pressable>
```

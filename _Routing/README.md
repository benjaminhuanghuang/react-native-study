# Expo Router

https://docs.expo.dev/router/introduction/

## Setup

https://docs.expo.dev/router/installation/

```bash
npx create-expo-app@latest myApp

npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

set entry in package.json 
```
"main": "expo-router/entry",
```

Add a deep linking scheme in your app.json:
```json
{
  "scheme": "your-app-scheme"
}
```

Modify babel.config.js
```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel']    // Add this line
  };
};
```
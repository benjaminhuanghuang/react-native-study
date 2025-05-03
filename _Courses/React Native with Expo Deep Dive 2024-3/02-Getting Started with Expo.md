# Getting Started with Expo

## Splash Screen

assets/the.png

app.json

```json
"expo": {
    "splash": {
        "image": "./assets/images/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    }
}
```

```sh
npx expo install expo-splash-screen
```

```js
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
```

## App Icon

app.json

```json
"expo": {
    "icon": "./assets/images/splash.png",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
}
```

## Theme

```json
"expo": {
    "userInterfaceStyle": "automatic"
}
```

```sh
npx expo install expo-system-ui
```

## Font

```sh
npx expo install expo-font
```

```jsx
import {useFonts} from 'expo-font';

export default function App()
{
    const [fontsLoaded, fontError] = useFonts ({
        'Hochstadt-Serif': require(' ./assets/fonts/Hochstadt-Serif.otf'),
        'TheGreatOutdoors-Regular': require('./assets/fonts/TheGreatOutdoors.otf'),
        'WorkSans-Regular': require('•/assets/fonts/WorkSans-Regular.ttf'),
    })


    return (
    <Text style={{ fontFamily: 'TheGreatOutdoors-Regular', fontSize: 30}}>
        Open up App-js to start working on your app!
    </Text>
    )
}
```

## Safe areas

```sh
npx expo install react-native-safe-area-context
```

```js
import { SafeAreaProvider } from 'react-native-safe-area-context';

<SafeAreaView/>
```

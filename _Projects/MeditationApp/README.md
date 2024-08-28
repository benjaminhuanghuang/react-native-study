# React Native & Expo Router Course – Build a Meditation App
https://www.youtube.com/watch?v=9UKCv9T_rIo

https://github.com/stevenGarciaDev/simple-meditation-app-expo-react-native



## Setup
```bash
npx create-expo-app@latest simple-meditation

npx expo start --clear  # run app and clear cache
```    

## Setup Nativewind

https://www.nativewind.dev/quick-starts/expo
```bash
npm i nativewind
npm install --save-dev tailwindcss@3.3.2

npx tailwindcss init
``` 

Modify tailwind.config.js

Modify babel.config.js

add app.d.ts

## Initial screen

## Linear gradient
```bash
    npx expo install expo-linear-gradient
```

```ts
import { LinearGradient } from "expo-linear-gradient";

    <LinearGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.8)"]} className="flex-1">
        <Content>{children}</Content>
    </LinearGradient>
```

## Reusable components
- CustomButton


## Splash Screen Image

app.json
```json
"splash": {
    "image": "./assets/simpleMeditationLogo.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
},    
```

## useRouter Hook
```tsx
import { useRouter } from "expo-router"

const router = useRouter();

router.push('/home');
```

```
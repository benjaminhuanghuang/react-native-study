# Build a Full Stack React Native App with Payments | PostgreSQL, TypeScript, Stripe, Tailwind

<https://www.youtube.com/watch?v=kmy_YNhl0mw>

<https://github.com/adrianhajdin/uber>

- TS
- Tailwind
- Map
- PostgreSQL
- Stripe

## Setup

### Create project

<https://www.nativewind.dev/quick-starts/expo>

```bash
npx create-expo-app ./

npm start ios

# Clear cache
npx expo start -c
```

Install Expo on cell phone. Scan the bar code

Trouble shooting

```sh
brew update
brew install watchman
```

### Setup postgres

<https://neon.tech/>

Create project and database

### Setup Tailwind3 with nativewind

<https://www.nativewind.dev/getting-started/installation>

```bash
npx expo install nativewind tailwindcss@3.4.17 react-native-reanimated@3.16.2 react-native-css-interop --dev
```

add tailwind.config.js

add babel.config.js

add global.css

add metro.config.js

add nativewind-env.d.ts for typescript

### Setup lint and prettier

<https://docs.expo.dev/guides/using-eslint/>

```sh
npx expo lint
npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

update .eslintrc.js

### Setup clerk

Clerk (a user authentication service) for a React Native project,

```sh
npx expo install @clerk/clerk-expo expo-auth-session expo-random
```

### Setup Expo router and navigation

```sh
npx expo install expo-location
```

## 00:47:50 — Welcome

Swiper

CustomButton

## 01:11:28 — SignUp, Sign

# Testing React Native Apps

By Simon Grimm 03 April 2024
<https://galaxies.dev/course/test-react-native-apps>
<https://github.com/Galaxies-dev/course-react-native-testing>

<https://www.bilibili.com/video/BV1vZ1YYGEo1/>

## What will I learn?

🚀 Setup tests in your React Native app
🔥 Write unit tests with Jest
🧪 Test components with React Testing Library
📱 Mock modules and test fetch requests
🤖 Run E2E tests with Maestro

## Setup Jest

```sh
npm i -D jest jest-expo
npm i --save-dev @types/jest
```

Update package.json

```json
"test": "jest --watchAll"
  
"jest": {
    "preset": "jest-expo"
},
```

## Snapshot test

```sh
npm i -D react-test-renderer @types/react-test-renderer
```

## Testing Library

```sh
npm i -D @testing-library/react-native
```

- Test the text on UI
- Test Event
- Fetch data

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
- Mock modules

## E2e test

Setup Maestro
<https://docs.maestro.dev/getting-started/installing-maestro>

```sh
curl -fsSL "https://get.maestro.mobile.dev" | bash
```

Script

```json
"e2e": "maestro test --format junit --output maestro/results.xml "
```

maestro/test-app.yaml

## Coverage

Update package.json

```json
"jest": {
"preset": "jest-expo",
"collectCoverage": true,
"collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**"
    "!**/babel. config-js",
    "!**/jest.setup.js"
    ],
"coverageReports": ["json", "html"]
}
```

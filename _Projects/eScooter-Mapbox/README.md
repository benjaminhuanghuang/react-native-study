# Building an e-Scooter App with React Native and Mapbox
https://www.youtube.com/watch?v=uxj8jnlooP8

https://github.com/notJust-dev/Lime-RNMapbox

## Setup
```bash
npx create-expo-stack@latest LimeApp --export-router --stylesheet
```

## Mapbox
React Native Mapbox Maps cannot be used in the "Expo Go" app, because it requires custom native code.

create account

https://rnmapbox.github.io/docs/install
```bash
npx expo install @rnmapbox/maps
```
Modify app.json
```
{
  "expo": {
    "plugins": [
      ...,
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsDownloadToken": "sk.ey.."
        }
      ]
    ]
  }
}
```

Rebuild, create ios and android folders
```
expo prebuild --clean
```
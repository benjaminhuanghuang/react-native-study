# 3 Ways To Style Components

## Inline Style

```js
const InlineStyle = () => {
  return (
    <View>
      <View style={{ backgroundColor: "red", width: 100, height: 100 }} />
      <Text style={{ color: "crimson" }}>Hello World</Text>
    </View>
  );
};

```

## InternalStyle

```js
const InternalStyle = () => {
  return (
    <View>
      <Text style={styles.textStyle}>HuXn WebDev</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "crimson",
    fontSize: 30,
    backgroundColor: "yellow",
    margin: 20,
    padding: 20,
  },
});
```

## External Style

```js
// style.ts
import { StyleSheet } from "react-native";

const st = StyleSheet.create({
  textStyle: {
    color: "white",
    fontSize: 30,
    backgroundColor: "teal",
    margin: 20,
    padding: 20,
  },
});

export default st;


import st from "./style";

const ExternalStyle = () => {
  return (
    <View>
      <Text style={st.textStyle}>HuXn WebDev</Text>
    </View>
  );
};
```

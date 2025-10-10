import { View, Text } from "react-native";
import { useTheme } from "../ThemeContext";

export function MyComponent() {
  const { colors, isDark } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello!</Text>
    </View>
  );
}

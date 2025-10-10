import { MyComponent } from "@/components/MyComponent";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MyComponent />
      <ThemeSwitcher />
    </View>
  );
}

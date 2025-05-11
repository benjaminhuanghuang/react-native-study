import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerShown: false,
          headerStyle: { backgroundColor: "#f4511e" },
        }}
      />
      <Stack.Screen
        name="users/[id]"
        options={{
          headerTitle: "User",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};
export default RootLayout;

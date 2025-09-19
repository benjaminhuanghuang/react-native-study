import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isAuthenticated = false; // Replace with your auth logic

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth");
    }
    setReady(true);
  }, [isAuthenticated]);

  // if (!ready) return null; // Prevent rendering until redirect decision

  return <>{children}</>;
}
export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
      </Stack>
    </RouteGuard>
  );
}

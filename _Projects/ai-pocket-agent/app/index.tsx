import {
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../shared/Colors";
import { useAuth, useUser, useSSO } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "@/config/FirebaseConfig";

// Preloads the browser for Android devices to reduce authentication load time
// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  console.log("User:", user?.primaryEmailAddress);
  useEffect(() => {
    router.replace("./home");
    return;
    if (isSignedIn) {
      // Redirect to the main app screen if already signed in
      router.replace("./home");
    }

    if (isSignedIn !== undefined) {
      setLoading(false);
    }
  }, [isSignedIn]);

  const onLoginPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (signUp) {
        await setDoc(doc(firestoreDb, "users", signUp.emailAddress ?? ""), {
          email: signUp?.emailAddress,
          name: signUp?.firstName + " " + signUp?.lastName,
          joinedAt: new Date(),
          credits: 20,
        });
      }

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Check for session tasks and navigate to custom UI to help users resolve them
          // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  useWarmUpBrowser();
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === "android" ? 40 : 30,
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/images/login.png")}
        style={{
          width: Dimensions.get("screen").width * 0.85,
          height: 280,
          resizeMode: "contain",
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
            color: Colors.PRIMARY,
          }}
        >
          Welcome to AI Pocket Agent
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Your Ultimate AI Personal Agent Try it Today, Completely Free!
        </Text>
      </View>
      {!loading && (
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 12,
            marginTop: 50,
          }}
          onPress={onLoginPress}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      )}
      {loading === undefined && <ActivityIndicator size={"large"} />}
    </View>
  );
}

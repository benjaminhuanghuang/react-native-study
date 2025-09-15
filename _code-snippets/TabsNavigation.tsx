import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import HomeScreen from "../Screens/HomeScreen";
import { RootStackScreenProps } from "./RootNavigation";

export type TabsStackParams = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
  Settings: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParams>();

export type TabsStackScreenProps<T extends keyof TabsStackParams> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParams, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <TabsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </TabsStack.Navigator>
  );
};

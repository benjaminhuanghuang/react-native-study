import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigation";
// Screens
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import Settings from "../Screens/Settings";

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
      <TabsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <TabsStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <TabsStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </TabsStack.Navigator>
  );
};

export default TabNavigator;

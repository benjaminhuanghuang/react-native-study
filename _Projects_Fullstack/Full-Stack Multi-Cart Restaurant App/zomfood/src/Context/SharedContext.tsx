import { createContext, ReactNode, useContext } from "react";
import {
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface SharedContextParams {
  scrollY: SharedValue<number>;
  globalScrollY: SharedValue<number>;
  scrollToTop: () => void;
}
const SharedContext = createContext<SharedContextParams | undefined>(undefined);

export const SharedContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const scrollY = useSharedValue(0);
  const globalScrollY = useSharedValue(0);
  const scrollToTop = () => {
    scrollY.value = withTiming(0, { duration: 300 });
    globalScrollY.value = withTiming(0, { duration: 300 });
  };

  return (
    <SharedContext value={{ scrollY, globalScrollY, scrollToTop }}>
      {children}
    </SharedContext>
  );
};

export const useSharedContext = () => {
  const context = useContext(SharedContext);
  if (context === undefined) {
    throw new Error("No context");
  }
  return context;
};

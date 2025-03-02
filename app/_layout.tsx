import "react-native-reanimated";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/redux";
import { RootNavigation } from "@/navigations";
import Snackbar from "@/components/Snackbar";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Provider store={store}>
          <RootNavigation />
          <Snackbar />
        </Provider>
      </PaperProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

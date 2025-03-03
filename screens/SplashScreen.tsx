import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface SplashScreenProps {}

function SplashScreen(props: SplashScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.message}>
        Welcome to Task Manager
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
  },
});

export type { SplashScreenProps };
export { SplashScreen };

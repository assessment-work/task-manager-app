import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput as RNPTextInput, Text } from "react-native-paper";

import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

interface TextInputProps {
  value?: string;
  mode?: "flat" | "outlined";
  label?: string;
  touched?: boolean;
  error?: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onPressRightIcon?: () => void;
  onChangeText?: (text: string) => void;
  onBlur?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

function TextInput(props: TextInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState<boolean>(
    props.secureTextEntry ?? false
  );

  function onPressEye() {
    setIsSecureTextEntry(!isSecureTextEntry);
  }

  return (
    <View style={styles.container}>
      <RNPTextInput
        value={props.value}
        label={props.label}
        mode={props.mode ?? "outlined"}
        error={props.error && props.touched ? true : false}
        secureTextEntry={isSecureTextEntry}
        onBlur={props.onBlur}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize}
        right={
          props.isPassword ? (
            <RNPTextInput.Icon
              icon={isSecureTextEntry ? "eye" : "eye-off"}
              onPress={props.onPressRightIcon ?? onPressEye}
            />
          ) : undefined
        }
      />
      {props.error && (
        <Text variant="bodyMedium" style={styles.error}>
          {props.error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 4,
    justifyContent: "flex-start",
  },
  error: {
    color: "red",
  },
});

export type { TextInputProps };
export { TextInput };

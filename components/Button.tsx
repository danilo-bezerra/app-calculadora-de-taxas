import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";
import React from "react";

type Props = TouchableHighlightProps & {
  text: string;
};

export default function Button({ text, disabled, ...props }: Props) {
  return (
    <TouchableHighlight
      style={
        disabled
          ? { ...styles.button, ...styles.buttonDisabled }
          : styles.button
      }
      underlayColor="#28fa"
      disabled={disabled}
      {...props}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#28f",
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
});

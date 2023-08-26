import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export const Input = ({ label, error, ...inputProps }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...inputProps} />
    {error && <Text style={styles.errorLabel}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#28f",
    height: 48,
    marginBottom: 5,
    width: "100%",
    borderRadius: 5,
    paddingHorizontal: 8,
    color: "#fff",
  },
  label: {
    color: "#fff",
    width: "90%",
    fontSize: 16,
    marginBottom: 5,
  },

  errorLabel: {
    color: "#f22",
    width: "90%",
    fontSize: 16,
    marginBottom: 5,
  },
});

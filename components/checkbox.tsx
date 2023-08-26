import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from "react-native-bouncy-checkbox";
import React from "react";
import { StyleSheet } from "react-native";

type Props = IBouncyCheckboxProps & {};

const Checkbox = ({ ...props }: Props) => {
  return (
    <BouncyCheckbox
      style={styles.checkbox}
      size={18}
      fillColor="#28f"
      textStyle={{
        color: "#fff",
        fontSize: 14,
      }}
      {...props}
    />
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    width: "100%",
    marginBottom: 12,
  },
});

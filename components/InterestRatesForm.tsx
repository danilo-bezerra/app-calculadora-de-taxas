import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateInterestRatesSchema } from "../src/utils/util";
import { Alert } from "react-native";
import Button from "./Button";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Input } from "./Input";

const { schema: formSchema, keys: formKeys } = generateInterestRatesSchema();

type Props = {
  initialValue: { [key: string]: string };
};

export default function InterestRatesForm({ initialValue }: Props) {
  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("interestRates", jsonValue);
      console.log("data: ", data);
      Alert.alert(
        "Taxas salvas",
        "As taxas salvas estarão disponíveis na próxima vez que você abrir o app"
      );
    } catch (e) {
      alert("Erro ao salvar");
    }
  }

  return (
    <View style={styles.container}>
      <Button text="Salvar" onPress={handleSubmit(onSubmit)} />
      <ScrollView style={styles.scrollView}>
        {formKeys.map((key) => (
          <Input
            key={key}
            label={key}
            onChangeText={(t) => setValue(key, t)}
            error={errors[key]?.message}
            placeholder="ex: 3.5%"
            keyboardType="decimal-pad"
            defaultValue={getValues()[key]}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 16,
  },
  scrollView: {
    marginTop: 12,
  },
});

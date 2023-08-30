import { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, Alert, View } from "react-native";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { NavigationContainer } from "@react-navigation/native";

import { Input } from "../components/Input";
import Button from "../components/Button";
import Checkbox from "../components/checkbox";
import { getStoredInterestRates } from "../src/utils/util";

const formSchema = z.object({
  value: z
    .string({ required_error: "digite um número" })
    .regex(/^[+-]?([0-9]*[.])?[0-9]+$/, "digite um número válido"),
  interestRate: z
    .string({ required_error: "digite um número" })
    .regex(/^[+-]?([0-9]*[.])?[0-9]+$/, "digite um número válido"),
  installmentsNum: z
    .string({ required_error: "digite um número" })
    .regex(/^[0-9]+$/, "digite um número inteiro (sem virgula)"),
});

export default function HomeScreen({ navigation }) {
  const [passOnInterestRate, setPassOnInterestRate] = useState(false);
  const [interestRate, setInterestRate] = useState("");
  const [savedInterestRates, setSavedInterestRates] = useState<{
    [key: string]: string;
  }>({});

  const {
    register,
    getValues,
    setValue: setFormValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function calc(data: z.infer<typeof formSchema>) {
    const [val, taxPercentage, installments] = [
      Number(data.value),
      Number(data.interestRate),
      Number(data.installmentsNum),
    ];

    if (!isNaN(val) && !isNaN(taxPercentage) && !isNaN(installments)) {
      const totalTax = (taxPercentage * val) / 100;
      const totalValue = passOnInterestRate ? val + totalTax : val;
      const installmentValue = totalValue / installments;

      const resultMessage = `Total: R$ ${totalValue.toFixed(
        2
      )}\nJuros: (${taxPercentage}%) R$ ${totalTax.toFixed(
        2
      )}\nParcelas: ${installments} x R$ ${installmentValue.toFixed(
        2
      )}\nRepassando custo: ${passOnInterestRate ? "sim" : "não"}`;

      Alert.alert("Resultado", resultMessage, [{ text: "OK" }]);
    }
  }

  useEffect(() => {
    register("value");
    register("interestRate");
    register("installmentsNum");
  }, [register]);

  useEffect(() => {
    const interestRate = savedInterestRates[`${getValues()?.installmentsNum}x`];
    console.log({ interestRate });
    console.log("oi");
    if (interestRate != null && interestRate != getValues("interestRate")) {
      console.log({ interestRate });
    }
  }, [getValues()]);

  useEffect(() => {
    getStoredInterestRates().then((saved) => {
      if (saved != null) {
        setSavedInterestRates(saved);
        console.log(saved);
      }
    });
  }, []);

  console.log(savedInterestRates);

  // adicionar função de cadastro de taxas por quantidade de parcelas

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calculadora de Taxas</Text>

      <Input
        label="Valor a receber"
        placeholder="ex: 1000"
        placeholderTextColor="#fffa"
        onChangeText={(v) => setFormValue("value", v)}
        keyboardType="decimal-pad"
        error={errors["value"]?.message}
      />

      <Input
        label="Taxa de juros"
        placeholder="ex: 12.50"
        placeholderTextColor="#fffa"
        value={interestRate}
        onChangeText={(v) => {
          setFormValue("interestRate", v);
          setInterestRate(v);
        }}
        keyboardType="decimal-pad"
        error={errors["interestRate"]?.message}
      />
      <Input
        label="Número de parcelas "
        placeholder="ex: 10"
        placeholderTextColor="#fffa"
        onChangeText={(v) => {
          setFormValue("installmentsNum", v);
          setInterestRate(
            savedInterestRates[`${getValues()?.installmentsNum}x`] ||
              interestRate
          );
        }}
        keyboardType="decimal-pad"
        error={errors["installmentsNum"]?.message}
      />

      <Checkbox
        text="Repassar custos"
        onPress={(isChecked: boolean) => setPassOnInterestRate(isChecked)}
      />

      <Button text="Calcular" onPress={handleSubmit(calc)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    padding: 16,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    marginVertical: 48,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
});

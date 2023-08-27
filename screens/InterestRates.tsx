import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generateInterestRatesSchema,
  getStoredInterestRates,
} from "../src/utils/util";
import Button from "../components/Button";
import InterestRatesForm from "../components/InterestRatesForm";

const {
  schema: formSchema,
  keys: formKeys,
  initialValue,
} = generateInterestRatesSchema();

const InterestRates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [defaultInterestRates, setDefaultInterestRates] = useState<{
    [key: string]: string;
  }>(initialValue);

  useEffect(() => {
    async function recoverData() {
      const savedData = await getStoredInterestRates();
      if (savedData != null) {
        setDefaultInterestRates(savedData);
      }
      setIsLoading(false);
    }

    recoverData();
  }, []);

  if (isLoading) {
    return <Text>Carregando</Text>;
  } else {
    return <InterestRatesForm initialValue={defaultInterestRates} />;
  }
};

export default InterestRates;



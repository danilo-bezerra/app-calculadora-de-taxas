import * as z from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function generateInterestRatesSchema(maxInstallments = 12) {
  const schema: {
    [key: string]: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
  } = {};
  const keys: string[] = [];
  const initialValue: { [key: string]: string } = {};

  for (let i = 1; i <= maxInstallments; i++) {
    schema[`${i}x`] = z
      .string({})
      .regex(/^[+-]?([0-9]*[.])?[0-9]+$/, "digite um número válido")
      .optional()
      .or(z.literal(""));

    keys.push(`${i}x`);
    initialValue[`${i}x`] = ""
  }

  return { schema: z.object(schema), keys, initialValue };

  // z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>
}

export const getStoredInterestRates = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("interestRates");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

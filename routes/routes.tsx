import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import InterestRates from "../screens/InterestRates";

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InterestRates"
          component={InterestRates}
          options={{
            title: "Taxas",
            headerStyle: {
              backgroundColor: "#28f",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

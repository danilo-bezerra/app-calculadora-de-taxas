import HomeScreen from "../screens/HomeScreen";
import InterestRates from "../screens/InterestRates";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome6 from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: "#1e1e1e",
          tabBarInactiveBackgroundColor: "#222",
          tabBarIconStyle: {
            
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calculator" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="InterestRates"
          component={InterestRates}
          options={{
            title: "Taxas",
            headerStyle: {
              backgroundColor: "#28f",
            },
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="percent" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { PokemonNavigator } from "./src/navigator/PokemonNavigator";
//import { UseEffectScreen } from "./src/screens/UseEffectScreen"; 
//import { FormScreen } from "./src/screens/FormScreen";
//import { StackNavigator } from "./src/navigator/StackNavigator";
//import { PokemonHomeScreen } from "./src/screens/pokeapi/PokemonHomeScreen";

const App = () => {
  return(
    <NavigationContainer>
      <PokemonNavigator/>
    </NavigationContainer>
  );
}
export default App;

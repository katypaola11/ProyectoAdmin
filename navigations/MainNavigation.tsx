import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import LoginScreen from '../screens/LoginScreen';
import LeerRepuestosScreen from '../screens/LeerRepuestosScreen';
import LeerUsuariosScreen from '../screens/LeerUsuariosScreen';
import RegistroAdmin from '../screens/RegistroAdmin';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import GuardarScreens from "../screens/GuardarScreen";
import EditarScreen from "../screens/EditarScreen";
import MarcaScreen from "../screens/MarcaScreen";
import HistorialScreen from "../screens/HistorialScreen";





const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Registro" component={RegistroAdmin} />

    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mytab"
        component={MyTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Usuarios" component={LeerUsuariosScreen} />
      <Stack.Screen name="Repuestos" component={LeerRepuestosScreen} />
      <Stack.Screen name="Guardar" component={GuardarScreens} />
      <Stack.Screen name="Editar" component={EditarScreen} />
      <Stack.Screen name="Marca" component={MarcaScreen} />
      <Stack.Screen name="Historial" component={HistorialScreen} />

    </Stack.Navigator>
  );
}

export default function NavegadorBottom() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

  )
}
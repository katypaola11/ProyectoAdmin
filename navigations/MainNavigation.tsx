import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import LeerRepuestosScreen from '../screens/LeerRepuestosScreen';
import LeerUsuariosScreen from '../screens/LeerUsuariosScreen';
import RegistroAdminScreen from '../screens/RegistroAdminScreen';


const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Leer Respuestos" component={LeerRepuestosScreen} />
      <Tab.Screen name="Leer Usuarios" component={LeerUsuariosScreen} />
      <Tab.Screen name="Registro Admin" component={RegistroAdminScreen} />

    </Tab.Navigator>
  );
}

export default function NavegadorBottom(){
    return (
        <NavigationContainer>
            <MyTab/>
        </NavigationContainer>

    )
}
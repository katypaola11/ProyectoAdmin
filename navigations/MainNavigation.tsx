import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import LeerRepuestosScreen from '../screens/LeerRepuestosScreen';
import LeerUsuariosScreen from '../screens/LeerUsuariosScreen';
import RegistroAdmin from '../screens/RegistroAdmin';
import HomeScreen from '../screens/HomeScreen';
import GuardarScreens from '../screens/GuardarScreen';




const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="LeerRespuestos" component={LeerRepuestosScreen} />
      <Tab.Screen name="LeerUsuarios" component={LeerUsuariosScreen} />
      <Tab.Screen name="Registro" component={RegistroAdmin}/>
      <Tab.Screen name="Home" component={HomeScreen}/>
     <Tab.Screen name='Guardar' component={GuardarScreens}/>


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
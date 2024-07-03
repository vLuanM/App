import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import {COLORS} from '../assets/colors';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import forgotPass from '../screens/ForgotPassWord';
import Preload from '../screens/Preload';
import Menu from '../screens/Menu';
import PerfilUsuario from '../screens/PerfilUsuario';
import Servicos from '../screens/Servicos';
import Servico from '../screens/Servico';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator 
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Home" component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon name="home" color={COLORS.primary} size={20} />,
      }}
      
      />

      <Tab.Screen
        component={Menu} name="Menu"
        options={{
          TBarLabel: 'Menu',
         tabBarIcon: () => <Icon type="ionicon" name="list" color={COLORS.primary} size={20} />,
      }}/>
     
     <Tab.Screen name="Servicos" component={Servicos} options={{
        tabBarLabel: 'Serviços',
        tabBarIcon: () => (
          <Icon type="ionicon" name="construct" color={COLORS.primary} size={20} />
        ),
     }
     } />

<Tab.Screen name="Servico" component={Servico} options={{
        tabBarLabel: 'Serviço',
        tabBarIcon: () => (
          <Icon type="ionicon" name="clipboard" color={COLORS.primary} size={20} />
        ),
     }
     } />
    
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator 
    initialRouteName="Preload" 
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen  name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassWord" component={forgotPass} />
     
    </Stack.Navigator>
  );
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="AuthStack" 
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppStack" component={AppStack} />
        <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} 
          options={{
            presentation: 'modal',
          }}
        />
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
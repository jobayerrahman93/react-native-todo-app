import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Create from './src/screens/create';
import Edit from './src/screens/edit';
import Home from './src/screens/home';
import SignIn from './src/screens/signIn';
import SignUp from './src/screens/signUp';
import { colors } from './src/theme/colors';


const Stack = createNativeStackNavigator();


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.blue
  },
};

export default function App() {

  const user = false;

  return (
<>
    <NavigationContainer  theme={MyTheme}>
      <Stack.Navigator   screenOptions={{ headerShown: false }} >
        {
          user ? <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="edit" component={Edit} />
              <Stack.Screen name="create" component={Create} />
          </>
          :
          <>
              <Stack.Screen name="signIn" component={SignIn} />
              <Stack.Screen name="signUp" component={SignUp} />
          </>
        }
     
  
      </Stack.Navigator>
    </NavigationContainer>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

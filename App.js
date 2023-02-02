import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Create from './src/screens/create';
import Edit from './src/screens/edit';
import Home from './src/screens/home';
import SignIn from './src/screens/signIn';
import SignUp from './src/screens/signUp';
import { colors } from './src/theme/colors';
// import { firebaseConfig } from './src/utils/config';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();




const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.blue
  },
};

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Antonio-Medium': require('./assets/fonts/Antonio-Medium.ttf'),
          'Antonio-Bold': require('./assets/fonts/Antonio-Bold.ttf'),
          'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
          'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        });
      
        await new Promise(resolve => setTimeout(resolve,2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {

      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const user = false;

  return (
<>
    <NavigationContainer onReady={onLayoutRootView}   theme={MyTheme}>
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

    <StatusBar style='light'/>
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

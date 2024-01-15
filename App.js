import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IndexScreen from './screens/IndexScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import FillRegisterStudent from './screens/FillRegisterScreens/FillRegisterStudent';
import FillRegisterSchool from './screens/FillRegisterScreens/FillRegisterSchool';
import SchoolHomeScreen from './screens/HomesScreens/SchoolHomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    {/* <KeyboardAvoidingView style={styles.screenDesign}> */}
      {/* <ScrollView style={styles.screenDesign}> */}
        <StatusBar style='dark'/>
        <SafeAreaView style={styles.screenDesign}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Index' component={IndexScreen}/>
              <Stack.Screen name='Register' component={RegisterScreen}/>
              <Stack.Screen name='Login' component={LoginScreen}/>
              <Stack.Screen name='NewRegisterStudent' component={FillRegisterStudent}/>
              <Stack.Screen name='NewRegisterSchool' component={FillRegisterSchool}/>
              <Stack.Screen name='HomeSchoolPage' component={SchoolHomeScreen}/>
            </Stack.Navigator>          
          </NavigationContainer>
        </SafeAreaView>
      {/* </ScrollView> */}
    {/* </KeyboardAvoidingView>       */}
    </>     
  );
}

const styles = StyleSheet.create({
  screenDesign: {
    flex: 1
  }
});

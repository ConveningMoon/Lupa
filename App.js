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

import FillRegisterStudentScreen from './screens/FillRegisterScreens/FillRegisterStudentScreen';
import FillRegisterSchoolScreen from './screens/FillRegisterScreens/FillRegisterSchoolScreen';

import SchoolHomeScreen from './screens/HomesScreens/SchoolHomeScreen';

import GroupsOptionsScreen from './screens/DisplayOptionsScreens/GroupsOptionsScreen';
import GroupsInfoScreen from './screens/InfoScreens/GroupsInfoScreen';

import StudentsOptionsScreen from './screens/DisplayOptionsScreens/StudentsOptionsScreen';
import StudentsInfoScreen from './screens/InfoScreens/StudentsInfoScreen';

import TeachersOptionsScreen from './screens/DisplayOptionsScreens/TeachersOptionsScreen';
import TeachersInfoScreen from './screens/InfoScreens/TeachersInfoScreen';

import SubjectsOptionsScreen from './screens/DisplayOptionsScreens/SubjectsOptionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    {/* <KeyboardAvoidingView style={styles.screenDesign}> */}
      {/* <ScrollView style={styles.screenDesign}> */}
        <StatusBar style='dark'/>
        <SafeAreaView style={styles.screenDesign}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                // headerStyle: { backgroundColor: '#351401' },
                // headerTintColor: 'white',
                // contentStyle: { backgroundColor: '#3f2f25' },
              }}
            >          
              <Stack.Screen 
                name='Index' 
                component={IndexScreen}
                options={{
                  //title: 'My title',                  
                  headerShown: false
                }}
              />
              <Stack.Screen 
                name='Register' 
                component={RegisterScreen}
              />
              <Stack.Screen 
                name='Login' 
                component={LoginScreen}
              />

              <Stack.Screen 
                name='NewRegisterStudent' 
                component={FillRegisterStudentScreen}
              />
              <Stack.Screen 
                name='NewRegisterSchool' 
                component={FillRegisterSchoolScreen}
              />

              <Stack.Screen 
                name='SchoolHome' 
                component={SchoolHomeScreen}
              />

              <Stack.Screen 
                name='Groups' 
                component={GroupsOptionsScreen}
              />
              <Stack.Screen 
                name='GroupsInfo' 
                component={GroupsInfoScreen}
              />

              <Stack.Screen 
                name='Students' 
                component={StudentsOptionsScreen}
              />
              <Stack.Screen 
                name='StudentsInfo' 
                component={StudentsInfoScreen}
              />

              <Stack.Screen 
                name='Teachers' 
                component={TeachersOptionsScreen}
              />
              <Stack.Screen 
                name='TeachersInfo' 
                component={TeachersInfoScreen}
              />

              <Stack.Screen 
                name='Subjects' 
                component={SubjectsOptionsScreen}
              />
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

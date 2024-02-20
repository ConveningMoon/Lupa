import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';

import Colors from './constants/colors';

import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IndexScreen from './screens/IndexScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import FillRegisterSchoolScreen from './screens/FillRegisterScreens/FillRegisterSchoolScreen';

import SchoolHomeScreen from './screens/HomesScreens/SchoolHomeScreen';

import GroupsOptionsScreen from './screens/DisplayOptionsScreens/GroupsOptionsScreen';
import GroupsInfoScreen from './screens/InfoScreens/GroupsInfoScreen';

import ParentsInfoScreen from './screens/InfoScreens/ParentsInfoScreen';
import FillRegisterParentScreen from './screens/FillRegisterScreens/FillRegisterParentScreen';
import ParentHomeScreen from './screens/HomesScreens/ParentHomeScreen';

import StudentsOptionsScreen from './screens/DisplayOptionsScreens/StudentsOptionsScreen';
import StudentsInfoScreen from './screens/InfoScreens/StudentsInfoScreen';
import FillRegisterStudentScreen from './screens/FillRegisterScreens/FillRegisterStudentScreen';
import StudentHomeScreen from './screens/HomesScreens/StudentHomeScreen';

import FillRegisterTeacherScreen from './screens/FillRegisterScreens/FillRegisterTeacherScreen';
import TeachersOptionsScreen from './screens/DisplayOptionsScreens/TeachersOptionsScreen';
import TeachersInfoScreen from './screens/InfoScreens/TeachersInfoScreen';
import TeacherHomeScreen from './screens/HomesScreens/TeacherHomeScreen';

import SettingScreen from './screens/SettingScreen';

import SubjectsOptionsScreen from './screens/DisplayOptionsScreens/SubjectsOptionsScreen';
import AuthContextProvider from './store/auth-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const homeScreens = {
  'SchoolHome': SchoolHomeScreen,
  'TeacherHome': TeacherHomeScreen,
  'ParentHome': ParentHomeScreen,
  'StudentHome': StudentHomeScreen,
};

function UserNavigation({route}){
  const userHome = route.params.userHome;
  const user = route.params.user;

  return (
    <Tab.Navigator>
        <Tab.Screen 
          name={userHome} 
          component={homeScreens[userHome]} 
          initialParams={{user: user}}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: Colors.color_darkGreen},
            tabBarIcon: () => (
              <Ionicons name="home-sharp" size={24} color={Colors.color_darkGreen} />
            )
          }}  
        />
        <Tab.Screen 
          name='SettingScreen' 
          component={SettingScreen} 
          options={{
            tabBarLabel: 'Settings',
            tabBarLabelStyle: {color: Colors.color_darkGreen},
            tabBarIcon: () => (
              <Ionicons name="settings-sharp" size={24} color={Colors.color_darkGreen} />
            )
          }}  
        />
    </Tab.Navigator>
  );
}


export default function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <StatusBar style='dark'/>
      <SafeAreaView style={styles.screenDesign}>
        <AuthContextProvider>
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
                options={{              
                  headerShown: false
                }}
              />
              {/* {!authCtx.isAuthenticated && */}
                <Stack.Screen 
                  name='Login' 
                  component={LoginScreen}
                  options={{               
                    headerShown: false
                  }}
                />
              {/* } */}

              {/* {authCtx.isAuthenticated && */}
                <Stack.Screen 
                  name='UserNavigation' 
                  component={UserNavigation}
                  options={{               
                    headerShown: false
                  }}
                />
              {/* } */}

              {/* Schools */}
              <Stack.Screen 
                name='NewRegisterSchool' 
                component={FillRegisterSchoolScreen}
                options={{               
                  headerShown: false
                }}
              />              

              {/* Groups */}
              <Stack.Screen 
                name='Groups' 
                component={GroupsOptionsScreen}
              />
              <Stack.Screen 
                name='GroupsInfo' 
                component={GroupsInfoScreen}
              />

              {/* Parents */}
              <Stack.Screen 
                name='ParentsInfo' 
                component={ParentsInfoScreen}
              />
              <Stack.Screen 
                name='NewRegisterParent' 
                component={FillRegisterParentScreen}
                options={{               
                  headerShown: false
                }}
              />
              {/* <Stack.Screen 
                name='ParentHome' 
                component={ParentHomeScreen}
              /> */}

              {/* Students */}
              <Stack.Screen 
                name='Students' 
                component={StudentsOptionsScreen}
              />
              <Stack.Screen 
                name='StudentsInfo' 
                component={StudentsInfoScreen}
              />
              <Stack.Screen 
                name='NewRegisterStudent' 
                component={FillRegisterStudentScreen}
                options={{               
                  headerShown: false
                }}
              />
              {/* <Stack.Screen 
                name='StudentHome' 
                component={StudentHomeScreen}
              /> */}

              {/* Teachers */}
              <Stack.Screen 
                name='Teachers' 
                component={TeachersOptionsScreen}
              />
              <Stack.Screen 
                name='TeachersInfo' 
                component={TeachersInfoScreen}
              />
              <Stack.Screen 
                name='NewRegisterTeacher' 
                component={FillRegisterTeacherScreen}
                options={{               
                  headerShown: false
                }}
              />
              {/* <Stack.Screen 
                name='TeacherHome' 
                component={TeacherHomeScreen}
              /> */}
              
              {/* Subjects */}
              <Stack.Screen 
                name='Subjects' 
                component={SubjectsOptionsScreen}
              />
            </Stack.Navigator>         
          </NavigationContainer>
        </AuthContextProvider>
      </SafeAreaView>
    </>     
  );
}

const styles = StyleSheet.create({
  screenDesign: {
    flex: 1
  }
});

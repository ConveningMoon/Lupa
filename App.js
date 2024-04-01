import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';

import { useContext, useState, useEffect } from 'react';

import Colors from './constants/colors';

import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IndexScreen from './screens/IndexScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import NotificationsScreen from './screens/NotificationsScreen';

import FillRegisterSchoolScreen from './screens/FillRegisterScreens/FillRegisterSchoolScreen';
import SchoolHomeScreen from './screens/HomesScreens/SchoolHomeScreen';
import SchoolsOptionsScreen from './screens/DisplayOptionsScreens/SchoolsOptionsScreen';
import SchoolsInfoScreen from './screens/InfoScreens/SchoolsInfoScreen';

import GroupsOptionsScreen from './screens/DisplayOptionsScreens/GroupsOptionsScreen';
import GroupsInfoScreen from './screens/InfoScreens/GroupsInfoScreen';

import ParentsInfoScreen from './screens/InfoScreens/ParentsInfoScreen';
import FillRegisterParentScreen from './screens/FillRegisterScreens/FillRegisterParentScreen';
import ParentHomeScreen from './screens/HomesScreens/ParentHomeScreen';
import ParentsOptionsScreen from './screens/DisplayOptionsScreens/ParentsOptionsScreen';

import StudentsOptionsScreen from './screens/DisplayOptionsScreens/StudentsOptionsScreen';
import StudentsInfoScreen from './screens/InfoScreens/StudentsInfoScreen';
import FillRegisterStudentScreen from './screens/FillRegisterScreens/FillRegisterStudentScreen';
import StudentHomeScreen from './screens/HomesScreens/StudentHomeScreen';

import FillRegisterTeacherScreen from './screens/FillRegisterScreens/FillRegisterTeacherScreen';
import TeachersOptionsScreen from './screens/DisplayOptionsScreens/TeachersOptionsScreen';
import TeachersInfoScreen from './screens/InfoScreens/TeachersInfoScreen';
import TeacherHomeScreen from './screens/HomesScreens/TeacherHomeScreen';

import SubjectsOptionsScreen from './screens/DisplayOptionsScreens/SubjectsOptionsScreen';
import SubjectsInfoScreen from './screens/InfoScreens/SubjectsInfoScreen';

import MainReportScreen from './screens/ReportsScreens/MainReportScreen';

import SettingScreen from './screens/SettingsScreens/SettingScreen';
import ChangeEmailScreen from './screens/SettingsScreens/ChangeEmailScreen';
import ChangePasswordScreen from './screens/SettingsScreens/ChangePasswordScreen';
import ChangeInfoScreen from './screens/SettingsScreens/ChangeInfoScreen';

import AuthContextProvider, { AuthContext } from './store/auth-context';

import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const homeScreens = {
  'School': SchoolHomeScreen,
  'Teacher': TeacherHomeScreen,
  'Parent': ParentHomeScreen,
  'Student': StudentHomeScreen,
};

function UserNavigation(){
  const authCtx = useContext(AuthContext);

  const userHome = authCtx.infoUser.type;

  return (
    <Tab.Navigator>
        <Tab.Screen 
          name={userHome} 
          component={homeScreens[userHome]} 
          //initialParams={{user: user}}
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: Colors.color_darkGreen},
            tabBarIcon: () => (
              <Ionicons name="home-sharp" size={24} color={Colors.color_darkGreen} />
            )            
          }}  
        />
        <Tab.Screen 
          name='NotificationsScreens' 
          component={NotificationsScreen} 
          options={{
            tabBarLabel: 'Notifications',
            tabBarLabelStyle: {color: Colors.color_darkGreen},
            tabBarIcon: () => (
              <Ionicons name="notifications-sharp" size={24} color={Colors.color_darkGreen}/> 
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

function NewUserScreens() {
  return (
    <Stack.Navigator>  
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
      <Stack.Screen 
        name='Login' 
        component={LoginScreen}
        options={{               
          headerShown: false
        }}
      />
      {/* Schools */}
      <Stack.Screen 
        name='NewRegisterSchool' 
        component={FillRegisterSchoolScreen}
        options={{               
          headerShown: false
        }}
      />  

      {/* Parents */}
      <Stack.Screen 
        name='NewRegisterParent' 
        component={FillRegisterParentScreen}
        options={{               
          headerShown: false
        }}
      />

      {/* Students */}
      <Stack.Screen 
        name='NewRegisterStudent' 
        component={FillRegisterStudentScreen}
        options={{               
          headerShown: false
        }}
      />

      {/* Teachers */}
      <Stack.Screen 
        name='NewRegisterTeacher' 
        component={FillRegisterTeacherScreen}
        options={{               
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function UserNavigationStack() {
  return(
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: '#351401' },
        // headerTintColor: 'white',
        // contentStyle: { backgroundColor: '#3f2f25' },
      }}
    > 
      <Stack.Screen 
        name='UserNavigation' 
        component={UserNavigation}
        options={{               
          headerShown: false
        }}
      />

      {/* Schools*/}
      <Stack.Screen 
        name='Schools' 
        component={SchoolsOptionsScreen}
      />
      <Stack.Screen 
        name='SchoolsInfo' 
        component={SchoolsInfoScreen}
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
        name='Parents' 
        component={ParentsOptionsScreen}
      />

      {/* Students */}
      <Stack.Screen 
        name='Students' 
        component={StudentsOptionsScreen}
      />
      <Stack.Screen 
        name='StudentsInfo' 
        component={StudentsInfoScreen}
      />

      {/* Teachers */}
      <Stack.Screen 
        name='Teachers' 
        component={TeachersOptionsScreen}
      />
      <Stack.Screen 
        name='TeachersInfo' 
        component={TeachersInfoScreen}
      />

      {/* Subjects */}
      <Stack.Screen 
        name='Subjects' 
        component={SubjectsOptionsScreen}
      />
      <Stack.Screen 
        name='SubjectsInfo' 
        component={SubjectsInfoScreen}
      />

      {/* Reports */}
      <Stack.Screen 
        name='MainReport' 
        component={MainReportScreen}
        options={{               
          title: 'Main Report',
          headerStyle: {backgroundColor: Colors.color_darkBlue},
          headerTintColor: Colors.color_lightGreen
        }}
      />

      {/* Settings */}
      <Stack.Screen 
        name='ChangeEmail' 
        component={ChangeEmailScreen}
      />
      <Stack.Screen 
        name='ChangePassword' 
        component={ChangePasswordScreen}
      />
      <Stack.Screen 
        name='ChangeInfo' 
        component={ChangeInfoScreen}
      />

    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <NewUserScreens />}
      {authCtx.isAuthenticated && <UserNavigationStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const convertToken = JSON.parse(storedToken);
      if (storedToken) {  
        authCtx.currentUser(convertToken);     
        authCtx.authenticate(convertToken.tokenId);
      }
      
      setAppIsReady(true);
    }

    fetchToken();
  }, []);

  if (appIsReady) {
    SplashScreen.hideAsync();
  }

  return <Navigation/>;
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <StatusBar style='dark'/>
      <SafeAreaView style={styles.screenDesign}>
        <AuthContextProvider>
          <Root />
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

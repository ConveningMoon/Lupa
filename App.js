import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    <>
      <StatusBar style='dark'/>
      <RegisterScreen />
    </>     
  );
}

const styles = StyleSheet.create({

});

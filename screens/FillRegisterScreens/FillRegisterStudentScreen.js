import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { useEffect, useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { registerNewUser } from '../../util/http';
import { createUser, login } from '../../util/auth';

export default function FillRegisterStudentScreen({navigation, route}) {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    async function emailExistsHandler (){
      try{
        await login(
          route.params.email,
          route.params.password
        );

        Alert.alert('Ups!', 'This email already exists');
        navigation.navigate('Register');
      }
      catch {
      }
    }
    emailExistsHandler();    
  }, []);

  async function newRegister(){
    setIsAuthenticating(true);

    try {
      const response = await createUser(
        route.params.email,
        route.params.password
      );
      
      await registerNewUser({
        id: response.localId,
        name: studentName.trim(),
        emailContact: studentEmail.trim(),
      }, "Student");

      navigation.navigate('Login');
    } catch (error) {
      setIsAuthenticating(false);
      Alert.alert('Something is wrong', 'Try it later');
    }

  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.globalContainer}>

          <SimpleFillInfoInput 
            text='Name' 
            onChangeText={setStudentName}
          />
          <SimpleFillInfoInput 
            text='Email' 
            onChangeText={setStudentEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />

          <ButtonInfoInput text='Register' onPressGeneral={newRegister}/>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    margin: 20
  }  
});
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';

import { useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { registerNewUser } from '../../util/http';

export default function FillRegisterStudentScreen({navigation, route}) {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function newRegister(){
    setIsAuthenticating(true);

    try {       
        await registerNewUser({
          id: route.params.id,
          name: studentName.trim(),
          username: route.params.username,
          emailContact: studentEmail.trim(),
          group: '',
          parents: [],
          school: ''
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
            text='Email to contact' 
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
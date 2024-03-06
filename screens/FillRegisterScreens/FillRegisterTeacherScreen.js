import { 
  View,  
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';

import { useEffect, useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';
import SimpleMultilineFillInfoInput from '../../components/InputComponents/SimpleMultilineFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { createUser, login } from '../../util/auth';
import { registerNewUser } from '../../util/http';

export default function FillRegisterTeacherScreen({navigation, route}) {
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherDescription, setTeacherDescription] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function newRegister(){
    setIsAuthenticating(true);

    try {
      await registerNewUser({
        id: route.params.id,
        name: teacherName.trim(),
        username: route.params.username,
        emailContact: teacherEmail.trim(),
        description: teacherDescription,
        groups: '',
        subjects: '',
        school: ''
      }, "Teacher");
      
      navigation.navigate('Login');
    } catch (error) {
      console.log(error.response.data);
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
            onChangeText={setTeacherName}
          />
          <SimpleFillInfoInput 
            text='Email' 
            onChangeText={setTeacherEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />

          <SimpleMultilineFillInfoInput 
            text='Description' 
            onChangeText={setTeacherDescription}
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
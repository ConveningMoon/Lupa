import { 
  View,  
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';
import SimpleMultilineFillInfoInput from '../../components/InputComponents/SimpleMultilineFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { createUser } from '../../util/auth';
import { registerNewUser } from '../../util/http';

export default function FillRegisterTeacherScreen({navigation, route}) {
  const [teacherUsername, setTeacherUserName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherDescription, setTeacherDescription] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function newRegister(){
    setIsAuthenticating(true);

    const tokenData = await createUser(
      route.params.email, 
      route.params.password,
    );

    await registerNewUser({
      id: tokenData.localId,
      username: teacherUsername.trim(),
      name: teacherName.trim(),
      emailContact: teacherEmail.trim(),
      description: teacherDescription
    }, "Teacher");

    setIsAuthenticating(false);

    navigation.navigate('Login');
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
            text='Username' 
            onChangeText={setTeacherUserName}
            autoCapitalize='none'
          />
          <SimpleFillInfoInput 
            text='Email' 
            onChangeText={setTeacherEmail}
            autoCapitalize='none'
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
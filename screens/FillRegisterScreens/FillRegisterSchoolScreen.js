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

import { registerNewUser } from '../../util/http';
import { createUser, login } from '../../util/auth';

export default function FillRegisterSchoolScreen({navigation, route}) {
  const [schoolName, setSchoolName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolWebsite, setSchoolWebsite] = useState('');
  const [schoolAdress, setSchoolAdress] = useState('');
  const [schoolDescription, setSchoolDescription] = useState('');

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
        name: schoolName.trim(),
        emailContact: schoolEmail.trim(),
        website: schoolWebsite.trim(),
        adress: schoolAdress,
        description: schoolDescription
      }, "School");

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
            text='Name of the school' 
            onChangeText={setSchoolName}                    
          />
          <SimpleFillInfoInput 
            text='Email' 
            onChangeText={setSchoolEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <SimpleFillInfoInput 
            text='Website' 
            onChangeText={setSchoolWebsite}
            autoCapitalize='none'
            keyboardType='url'
          />
          <SimpleFillInfoInput 
            text='Adress' 
            onChangeText={setSchoolAdress}
          />

          <SimpleMultilineFillInfoInput 
            text='Description' 
            onChangeText={setSchoolDescription}
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
    marginVertical: 40,
    marginHorizontal: 20
  }  
});
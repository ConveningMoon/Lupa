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
import SimpleMultilineFillInfoInput from '../../components/InputComponents/SimpleMultilineFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { registerNewUser } from '../../util/http';

export default function FillRegisterSchoolScreen({navigation, route}) {
  const [schoolName, setSchoolName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolWebsite, setSchoolWebsite] = useState('');
  const [schoolAdress, setSchoolAdress] = useState('');
  const [schoolDescription, setSchoolDescription] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function newRegister(){
    setIsAuthenticating(true);

    try {   
      await registerNewUser({
        id: route.params.id,
        name: schoolName.trim(),
        username: route.params.username,
        emailContact: schoolEmail.trim(),
        website: schoolWebsite.trim(),
        adress: schoolAdress.trim(),
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
            text='Contact email' 
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
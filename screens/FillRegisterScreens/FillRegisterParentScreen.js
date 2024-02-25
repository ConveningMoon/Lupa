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

export default function FillRegisterParentScreen({navigation, route}) {
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');

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
        name: parentName.trim(),
        emailContact: parentEmail.trim(),
      }, "Parent");

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
              onChangeText={setParentName}
            />
            <SimpleFillInfoInput 
              text='Email' 
              onChangeText={setParentEmail}
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
    },
});
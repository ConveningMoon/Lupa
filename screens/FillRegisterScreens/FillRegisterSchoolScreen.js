import { 
  View,  
  StyleSheet, 
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { useContext, useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';
import SimpleMultilineFillInfoInput from '../../components/InputComponents/SimpleMultilineFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { createUser } from '../../util/auth';
import { AuthContext } from '../../store/auth-context';
import { registerNewUser } from '../../util/http';

export default function FillRegisterSchoolScreen({navigation, route}) {
  const [schoolUsername, setSchoolUserName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolWebsite, setSchoolWebsite] = useState('');
  const [schoolAdress, setSchoolAdress] = useState('');
  const [schoolDescription, setSchoolDescription] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function newRegister(){
    setIsAuthenticating(true);

    const token = await createUser(
      route.params.email, 
      route.params.password,
    );
    authCtx.authenticate(token);

    // const newUserId = tokenData.localId;
    // await registerNewUser({
    //   id: newUserId,
    //   name: schoolName
    // }, "School");

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

          <SimpleFillInfoInput text='Name of the school' onChangeText={setSchoolName}/>
          <SimpleFillInfoInput text='Username' onChangeText={setSchoolUserName}/>
          <SimpleFillInfoInput text='Email' onChangeText={setSchoolEmail}/>
          <SimpleFillInfoInput text='Website' onChangeText={setSchoolWebsite}/>
          <SimpleFillInfoInput text='Adress' onChangeText={setSchoolAdress}/>

          <SimpleMultilineFillInfoInput text='Description' onChangeText={setSchoolDescription}/>
          
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
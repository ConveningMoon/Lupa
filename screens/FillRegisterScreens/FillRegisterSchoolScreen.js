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

export default function FillRegisterSchoolScreen({navigation}) {
  const [schoolUsername, setSchoolUserName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolWebsite, setSchoolWebsite] = useState('');
  const [schoolAdress, setSchoolAdress] = useState('');
  const [schoolDescription, setSchoolDescription] = useState('');

  function toLogin(){
    navigation.navigate('Login');
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
          
          <ButtonInfoInput text='Register' onPressGeneral={toLogin}/>

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
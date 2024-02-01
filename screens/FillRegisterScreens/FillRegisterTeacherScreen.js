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

export default function FillRegisterTeacherScreen({navigation}) {
  const [teacherUsername, setTeacherUserName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherDescription, setTeacherDescription] = useState('');

  function toLogin(){
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.globalContainer}>

          <SimpleFillInfoInput text='Name' onChangeText={setStudentName}/>
          <SimpleFillInfoInput text='Username' onChangeText={setStudentUsername}/>
          <SimpleFillInfoInput text='Email' onChangeText={setStudentEmail}/>

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
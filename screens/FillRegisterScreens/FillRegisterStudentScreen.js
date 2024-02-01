import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { useState } from 'react';

import Colors from '../../constants/colors';
import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';

export default function FillRegisterStudentScreen({navigation}) {
  const [studentUsername, setStudentUsername] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

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
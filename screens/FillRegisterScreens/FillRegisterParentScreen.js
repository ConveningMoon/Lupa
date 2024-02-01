import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';

export default function FillRegisterParentScreen({navigation}) {
  const [parentUsername, setParentUserName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  function toLogin(){
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.globalContainer}>

          <SimpleFillInfoInput text='Name' onChangeText={setParentName}/>
          <SimpleFillInfoInput text='Username' onChangeText={setParentUserName}/>
          <SimpleFillInfoInput text='Email' onChangeText={setParentEmail}/>


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
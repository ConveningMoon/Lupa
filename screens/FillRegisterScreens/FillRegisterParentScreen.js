import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { useState} from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';

export default function FillRegisterParentScreen({navigation}) {
  const [parentUsername, setParentUserName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  // useEffect(() => {
  //   const listStudents = STUDENTS.filter(student => student.school === selectSchool[0]).map(student => (
  //     { label: student.name, value: student.id }
  //   ));
  // },[selectSchool])  

  function toLogin(){
    //navigation.navigate('Login');
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
    },
});
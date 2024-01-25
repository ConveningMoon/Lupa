import { View, Text, StyleSheet, TextInput} from 'react-native';

import { useState } from 'react';

import Colors from '../../constants/colors';
import ButtonInfoInput from '../../components/ButtonInfoInput';

export default function FillRegisterSchoolScreen({navigation}) {
  const [schoolUserName, setSchoolUserName] = useState('');
  const [schoolName, setSchoolName] = useState('');

  function newSchoolUserName(enteredUserName){
    setSchoolUserName(enteredUserName);
  }

  function newSchoolName(enteredName){
    setSchoolName(enteredName);
  }

  function toSchoolHomePage(){
    navigation.navigate('Login');
  }

  return (
    <View style={styles.globalContainer}>
      <Text style={styles.textContainer}>Username</Text>
      <TextInput style={styles.inputContainer} onChangeText={newSchoolUserName}/>
      <Text style={styles.textContainer}>School's name</Text>
      <TextInput style={styles.inputContainer} onChangeText={newSchoolName}/>
      <Text style={styles.textContainer}>Email</Text>
      <TextInput style={styles.inputContainer}/>
      <Text style={styles.textContainer}>Website</Text>
      <TextInput style={styles.inputContainer}/>
      <ButtonInfoInput text='Register' onPressGeneral={toSchoolHomePage}/>
    </View>
  )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        paddingHorizontal: 35,
        paddingVertical: 10,
        alignItems: 'center',
    },
    textContainer: {
        fontSize: 16,
        color: Colors.color_lightGreen,
        paddingVertical: 10,
        fontWeight: 'bold'        
    },
    inputContainer: {
        borderWidth: 2,
        width: '90%',
        borderColor: Colors.color_lightGreen,
        borderRadius: 10,
        fontSize: 16,
        padding: 5
    }
});
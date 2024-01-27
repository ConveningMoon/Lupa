import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { useState } from 'react';

import Colors from '../../constants/colors';
import ButtonInfoInput from '../../components/ButtonInfoInput';

export default function FillRegisterTeacherScreen({navigation}) {
  const [teacehrUsername, setSchoolUserName] = useState('');
  const [teacherName, setSchoolName] = useState('');

  function toLogin(){
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.globalContainer}>
          <Text style={styles.textContainer}>Username</Text>
          <TextInput style={styles.inputContainer} onChangeText={setSchoolUserName}/>

          <Text style={styles.textContainer}>School's name</Text>
          <TextInput style={styles.inputContainer} onChangeText={setSchoolName}/>

          <Text style={styles.textContainer}>Email</Text>
          <TextInput style={styles.inputContainer}/>

          <Text style={styles.textContainer}>Website</Text>
          <TextInput style={styles.inputContainer}/>

          <Text style={styles.textContainer}>Adress</Text>
          <TextInput style={styles.inputContainer}/>

          <Text 
            style={styles.textContainer}>Description</Text>
          <TextInput 
            style={styles.inputContainer}
            multiline={true}
            numberOfLines={3}
          />

          <ButtonInfoInput text='Register' onPressGeneral={toLogin}/>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
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
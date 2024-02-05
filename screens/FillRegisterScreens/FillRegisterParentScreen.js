import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { useState } from 'react';

import { STUDENTS} from '../../data/dummy-data';

import DropDownPicker from 'react-native-dropdown-picker';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';

export default function FillRegisterParentScreen({navigation}) {
  const [parentUsername, setParentUserName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  const [openStudents, setOpenStudents] = useState(false);
  const [valueStudents, setValueStudents] = useState(null);
  const [itemsStudents, setItemsStudents] = useState(
    [
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'}
    ]
    // STUDENTS.map(student => (
    //   { label: student.name, value: student.id }
    // ))

  );

  function toLogin(){
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {/* <ScrollView> */}
        <View style={styles.globalContainer}>
          <View style={styles.generalInfo}>
            <SimpleFillInfoInput text='Name' onChangeText={setParentName}/>
            <SimpleFillInfoInput text='Username' onChangeText={setParentUserName}/>
            <SimpleFillInfoInput text='Email' onChangeText={setParentEmail}/>

            <DropDownPicker 
              searchable={true}
              multiple={true}
              style = {styles.dropStudentsContainer}
              open={openStudents}
              value={valueStudents}
              items={itemsStudents}
              setOpen={setOpenStudents}
              setValue={setValueStudents}
              setItems={setItemsStudents} 
              max={2}
            />
          </View>

          <View style={styles.buttonContainer}>
            <ButtonInfoInput text='Register' onPressGeneral={toLogin}/>
          </View>
        </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 20        
    },
    generalInfo: {
      flex: 1,
      alignItems: 'stretch', 
      //justifyContent: 'flex-start',
      backgroundColor: 'black'
    },
    dropStudentsContainer: {
      //height: '100%'
    }
});
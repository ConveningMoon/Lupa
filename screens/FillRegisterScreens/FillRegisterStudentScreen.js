import { View, Text, StyleSheet, TextInput} from 'react-native'

import Colors from '../../constants/colors';
import ButtonInfoInput from '../../components/ButtonInfoInput';

export default function FillRegisterStudentScreen({navigation}) {
  return (
    <View style={styles.globalContainer}>
      <Text style={styles.textContainer}>Username</Text>
      <TextInput style={styles.inputContainer}/>
      <Text style={styles.textContainer}>Name</Text>
      <TextInput style={styles.inputContainer}/>
      <Text style={styles.textContainer}>Email</Text>
      <TextInput style={styles.inputContainer}/>
      <Text style={styles.textContainer}>School code</Text>
      <TextInput style={styles.inputContainer}/>
      <Text style={styles.textContainer}>Course</Text>
      <TextInput style={styles.inputContainer}/>
      <ButtonInfoInput text='Continue'/>
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
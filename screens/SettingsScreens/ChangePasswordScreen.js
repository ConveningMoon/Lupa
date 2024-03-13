import { 
  View,  
  StyleSheet, 
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Text
} from 'react-native';

import { useContext, useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { AuthContext } from '../../store/auth-context';

import { changePassword } from '../../util/auth';

import Colors from '../../constants/colors';

export default function ChangePasswordScreen({navigation}) {
  const authCtx = useContext(AuthContext);

  const [enteredPassword, setEnteredPassword] = useState('');
  const [repeatEnteredPassword, setRepeatEnteredPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function changePasswordHandler(){
    setIsAuthenticating(true);

        const checkPassword = enteredPassword.trim().length > 6;
        const checkRepeatPassword = enteredPassword.trim() === repeatEnteredPassword.trim();

        if (!checkPassword) {
          setErrorMessage('The password is to short.');
          setIsAuthenticating(false);
        } else if (!checkRepeatPassword) {
          setErrorMessage('The passwords do not match.');
          setIsAuthenticating(false);
        } else {
            try { 
              await changePassword(authCtx.infoUser.tokenId, enteredPassword.trim());
              
              authCtx.logout();
              navigation.navigate('Login');

            } catch (error) {
              setIsAuthenticating(false);
                Alert.alert('Something goes wrong!', 'Use an other password.');            
            }                                   
        }

        setShowError(!checkPassword || !checkRepeatPassword);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Changing your password..." />;
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.globalContainer}>

          {showError &&(
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <SimpleFillInfoInput 
            text='New password' 
            onChangeText={setEnteredPassword}      
            autoCapitalize='none'
            //keyboardType='email-address'              
          />

          <SimpleFillInfoInput 
            text='Repeat your new password' 
            onChangeText={setRepeatEnteredPassword}
            autoCapitalize='none'
            //keyboardType='email-address'
          />
          
          <ButtonInfoInput text='CHANGE PASSWORD' onPressGeneral={changePasswordHandler}/>

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
  },
  errorText: {
    color: Colors.error_red
  }
});
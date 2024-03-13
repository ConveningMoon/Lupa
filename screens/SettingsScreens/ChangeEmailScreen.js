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

import { changeEmail } from '../../util/auth';

import Colors from '../../constants/colors';

export default function ChangeEmailScreen({navigation}) {
  const authCtx = useContext(AuthContext);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [repeatEnteredEmail, setRepeatEnteredEmail] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function changeEmailHandler(){
    setIsAuthenticating(true);

        const checkEmail = enteredEmail.trim().includes('@');
        const checkRepeatEmail = enteredEmail.trim() === repeatEnteredEmail.trim();

        if (!checkEmail) {
          setErrorMessage('The email format is incorrect.');
          setIsAuthenticating(false);
        } else if (!checkRepeatEmail) {
          setErrorMessage('The emails do not match.');
          setIsAuthenticating(false);
        } else {
          console.log(authCtx.infoUser.tokenId);
            try { 
              await changeEmail(authCtx.infoUser.tokenId, enteredEmail.trim());
              
              authCtx.logout();
              navigation.navigate('Login');

            } catch (error) {
              setIsAuthenticating(false);
              if(error.response.data.error.message === 'EMAIL_EXISTS') {
                setIsAuthenticating(false);
                Alert.alert('Email already exists', 'Use a new one.');
            }
            }                                   
        }

        setShowError(!checkEmail || !checkRepeatEmail);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Changing your email..." />;
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.globalContainer}>

          {showError &&(
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <SimpleFillInfoInput 
            text='New email' 
            onChangeText={setEnteredEmail}      
            autoCapitalize='none'
            keyboardType='email-address'              
          />

          <SimpleFillInfoInput 
            text='Repeat your new email' 
            onChangeText={setRepeatEnteredEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />
          
          <ButtonInfoInput text='CHANGE EMAIL' onPressGeneral={changeEmailHandler}/>

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
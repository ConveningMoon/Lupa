import { 
  View,  
  StyleSheet, 
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';

import { useContext, useState } from 'react';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import SimpleFillInfoInput from '../../components/InputComponents/SimpleFillInfoInput';
import SimpleMultilineFillInfoInput from '../../components/InputComponents/SimpleMultilineFillInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import { AuthContext } from '../../store/auth-context';

import Colors from '../../constants/colors';

import { changeUserInfo } from '../../util/user-http';

export default function ChangeInfoScreen({navigation}) {
  const authCtx = useContext(AuthContext);
  const user = authCtx.infoUser;

  const [emailContact, setEmailContact] = useState(''); 
  const [enteredName, setEnteredName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWesite] = useState('');

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function changeInfoHandler(){
    setIsAuthenticating(true);
    const infoChanged = {};

    if (emailContact !== '') {
      infoChanged.emailContact = emailContact;
    }
    if(enteredName !== '') {
      infoChanged.name = enteredName;
    }
    if(description !== '') {
      infoChanged.description = description;
    }
    if(address !== '') {
      infoChanged.address = address;
    }
    if(website !== '') {
      infoChanged.website = website;
    }

    try {
        await changeUserInfo(user.data.id, user.type, infoChanged);

        authCtx.logout();
        navigation.navigate('Login');

        setIsAuthenticating(false);
    } catch (error) {
      setIsAuthenticating(false);
      Alert.alert('Something goes wrong!', 'Please try later.');
    }
  }


  if (isAuthenticating) {
    return <LoadingOverlay message="Changing your information..." />;
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.globalContainer}>

          <SimpleFillInfoInput 
            text='Name of the school' 
            onChangeText={setEnteredName}   
            placeholder={user.data.name}                 
          />

          <SimpleFillInfoInput 
            text='Contact email' 
            onChangeText={setEmailContact}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder={user.data.emailContact} 
          />
          
          {user.type === 'School' && 
            <View>
              <SimpleFillInfoInput 
                text='Website' 
                onChangeText={setWesite}
                autoCapitalize='none'
                keyboardType='url'
                placeholder={user.data.website} 
              />
              <SimpleFillInfoInput 
                text='Adress' 
                onChangeText={setAddress}
                placeholder={user.data.adress} 
              />
              <SimpleMultilineFillInfoInput 
                text='Description' 
                onChangeText={setDescription}
                placeholder={user.data.description} 
              />
            </View>
          }
          <ButtonInfoInput text='CHANGE MY INFORMATION' onPressGeneral={changeInfoHandler}/>

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
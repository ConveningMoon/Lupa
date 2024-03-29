import {
    View, 
    StyleSheet, 
    Text,
    Alert
} from 'react-native';

import { 
    useState,
    useEffect
} from 'react';

import { useIsFocused } from '@react-navigation/native';

import Colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import InfoInputWithLogo from '../components/InputComponents/InfoInputWithLogo';
import ChangeTypeUser from '../components/ChangeTypeUser';
import ButtonInfoInput from '../components/ButtonComponents/ButtonInfoInput';
import MicroPressText from '../components/PressableTextComponents/MicroPressText';
import TypeUser from '../components/TypeUser';
import LoadingOverlay from '../components/LoadingOverlay';

import { createUser } from '../util/auth';

import { existUsername } from '../util/user-http';

function RegisterScreen({navigation}){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredRepeatPassword, setEnteredRepeatPassword] = useState('');
    const [typeUser, setTypeUser] = useState('None');

    const [typeUserVisible, setTypeUserVisible] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            setIsAuthenticating(false);
        };
    }, [isFocused]);

    function selectUserType(){
        setTypeUserVisible(true);
    }

    async function signUpHandler(){
        setIsAuthenticating(true);

        const checkEmail = enteredEmail.trim().includes('@');
        const checkPassword = enteredPassword.trim().length > 6;
        const checkRepeatPassword = enteredPassword.trim() === enteredRepeatPassword.trim();

        if (!checkEmail) {
            setErrorMessage('The email format is incorrect.');
        } else if (!checkPassword) {
            setErrorMessage('The password is too short.');
        } else if (!checkRepeatPassword) {
            setErrorMessage('The passwords do not match.');
        } else {
            if (typeUser !== 'None') {
                try {
                    const checkUsername = await existUsername(enteredUsername.trim().toLowerCase());
                    if(!checkUsername) {   
                        const response = await createUser(enteredEmail.trim(), enteredPassword.trim());
                                        
                        navigation.navigate(`NewRegister${typeUser}`, {
                            id: response.localId,
                            username: enteredUsername.trim().toLowerCase(),
                        });
                    } else {
                        setIsAuthenticating(false);
                        Alert.alert('Username already exists', 'Please, use another one');
                    }

                } catch (error) {
                    setIsAuthenticating(false);
                    if(error.response.data.error.message === 'EMAIL_EXISTS') {
                        setIsAuthenticating(false);
                        Alert.alert('Oops!', 'Email already exists');
                    }
                }                         
            } else {
                setErrorMessage('Select user type please');
            }            
        }

        setShowError(!checkEmail || !checkPassword || !checkRepeatPassword);
    }

    function onBackHandler(){
        setTypeUserVisible(false);
    }

    function newLogin(){
        navigation.navigate('Login');
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Checking credentials..." />;
    }

    return(
        <View style={styles.globalContainer}>  
            <View style={styles.registerLabelBox}>
                <Text style={styles.registerLabel}>
                    REGISTER
                </Text> 
            </View>  
            
            {showError &&(
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <InfoInputWithLogo
                name='mail'
                placeholder='Enter your email'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredEmail}
                value = {enteredEmail}
                keyboardType = 'email-address'
            />

            <InfoInputWithLogo
                name='person'
                placeholder='Enter your username'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredUsername}
                value = {enteredUsername}
            />

            <InfoInputWithLogo
                name='key'
                placeholder='Enter your password'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredPassword}
                value = {enteredPassword}
                keyboardType = 'default'
                //secureTextEntry = {true}
            />

            <InfoInputWithLogo
                name='key'
                placeholder='Repeat your password'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredRepeatPassword}
                value = {enteredRepeatPassword}
                keyboardType = 'default'
                //secureTextEntry = {true}
            />

            <ChangeTypeUser typeUserText={typeUser} onPress={selectUserType}/>

            <ButtonInfoInput text='SIGNUP' onPressGeneral={signUpHandler}/>

            <MicroPressText text='Already have an account'  onNewPress={newLogin}/>

            <TypeUser 
                visible={typeUserVisible} 
                onBack={onBackHandler}
                onSelect={setTypeUserVisible}
                value={setTypeUser}
            />
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    globalContainer:{
        flex: 1,
        paddingHorizontal: 35,
        paddingVertical: 10,
        alignItems: 'center',
    },
    registerLabelBox: {
        paddingBottom: 10,
        marginBottom: 25,
        borderBottomWidth: 3,
        borderBottomEndRadius: 20,
        borderBottomColor: Colors.color_lightGreen
    },
    registerLabel: {
        color: Colors.color_lightGreen,
        fontSize: 40,
        fontWeight: 'bold'
    },
    errorText: {
        color: Colors.error_red
    }

});
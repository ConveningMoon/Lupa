import {
    View, 
    StyleSheet, 
    Text,
    Platform,
    TextInput
} from 'react-native';

import { 
    useState,
    useEffect
} from 'react';

import Colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import InfoInputWithLogo from '../components/InputComponents/InfoInputWithLogo';
import ChangeTypeUser from '../components/ChangeTypeUser';
import ButtonInfoInput from '../components/ButtonComponents/ButtonInfoInput';
import MicroPressText from '../components/PressableTextComponents/MicroPressText';
import TypeUser from '../components/TypeUser';
import LoadingOverlay from '../components/LoadingOverlay';

import { SCHOOLS, TEACHERS, PARENTS, STUDENTS } from '../data/dummy-data';

function RegisterScreen({navigation}){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredRepeatPassword, setEnteredRepeatPassword] = useState('');
    const [typeUser, setTypeUser] = useState('None');

    const [typeUserVisible, setTypeUserVisible] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    function selectUserType(){
        setTypeUserVisible(true);
    }

    function signUpHandler(){
        setIsAuthenticating(true);

        const checkEmail = enteredEmail.includes('@');
        const checkPassword = enteredPassword.length > 6;
        const checkRepeatPassword = enteredPassword === enteredRepeatPassword;
        //Change the following line to fetch and check from the database
        const findTypes = [SCHOOLS, TEACHERS, PARENTS, STUDENTS];
        const findEmail = findTypes.find(type => type.find(user => user.email === enteredEmail));
        
        if (findEmail) {
            setErrorMessage('The email already exists.');
        } else if (!checkEmail) {
            setErrorMessage('The email is incorrect.');
        } else if (!checkPassword) {
            setErrorMessage('The password is too short.');
        } else if (!checkRepeatPassword) {
            setErrorMessage('The passwords do not match.');
        } else {
            if (typeUser !== 'None') {
                navigation.navigate(`NewRegister${typeUser}`, {
                    email: enteredEmail,
                    password: enteredPassword
                });
    
            } else {
                setErrorMessage('Select user type please');
            }            
        }
        
        setShowError(findEmail || !checkEmail || !checkPassword || !checkRepeatPassword);

        setIsAuthenticating(false);
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
                secureTextEntry = {false}
            />

            <InfoInputWithLogo
                name='key'
                placeholder='Enter your password'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredPassword}
                value = {enteredPassword}
                keyboardType = 'default'
                secureTextEntry = {true}
            />

            <InfoInputWithLogo
                name='key'
                placeholder='Repeat your password'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredRepeatPassword}
                value = {enteredRepeatPassword}
                keyboardType = 'default'
                secureTextEntry = {true}
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
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

import InfoInput from '../components/InfoInput';
import ChangeTypeUser from '../components/ChangeTypeUser';
import ButtonInfoInput from '../components/ButtonInfoInput';
import MicroPressText from '../components/MicroPressText';
import TypeUser from '../components/TypeUser';
import { SCHOOLS, TEACHERS, PARENTS, STUDENTS } from '../data/dummy-data';

function RegisterScreen({navigation}){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredRepeatPassword, setEnteredRepeatPassword] = useState('');
    const [typeUser, setTypeUser] = useState('Not selected');
    const [typeUserVisible, setTypeUserVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    function selectUserType(){
        setTypeUserVisible(true);
    }

    function signUpHandler(){
        const userTypes = ['School', 'Teacher', 'Parent', 'Student'];
        const userType = userTypes.find(type => type.toLowerCase() === typeUser.toLowerCase());
        const findTypes = [SCHOOLS, TEACHERS, PARENTS, STUDENTS];
        const findEmail = findTypes.find(type => type.find(user => user.email === enteredEmail))
        if(!findEmail){
            if (userType) {
                navigation.navigate(`NewRegister${userType}`);
            } else {
                setTypeUser('Select user type please');
            }
        }
        else {
            setErrorMessage(true);
        }
    }

    function onBackHandler(){
        setTypeUserVisible(false);
    }

    function newLogin(){
        navigation.navigate('Login');
    }

    return(
        <View style={styles.globalContainer}>  
            <View style={styles.registerLabelBox}>
                <Text style={styles.registerLabel}>
                    REGISTER
                </Text> 
            </View>  
            
            {errorMessage &&(
                <Text style={styles.errorText}>This email already exists</Text>
            )}

            <InfoInput
                name='mail'
                placeholder='Enter your email'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredEmail}
                value = {enteredEmail}
            />

            <InfoInput
                name='key'
                placeholder='Enter your password'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredPassword}
                value = {enteredPassword}
            />

            <InfoInput
                name='key'
                placeholder='Repeat your password'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredRepeatPassword}
                value = {enteredRepeatPassword}
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
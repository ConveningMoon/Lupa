import {
    View, 
    StyleSheet, 
    Text,
    Platform
} from 'react-native';

import { 
    useState,
    useEffect
} from 'react';

import Colors from '../constants/colors';

import InfoInput from '../components/InfoInput';
import ButtonInfoInput from '../components/ButtonInfoInput';
import MicroPressText from '../components/MicroPressText';
import TypeUser from '../components/TypeUser';

function RegisterScreen({navigation}){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [typeUserVisible, setTypeUserVisible] = useState(false);

    function newEmailHandler(newEnteredEmail){
        setEnteredEmail(newEnteredEmail);
    }

    function newPasswordHandler(newEnteredPassword){
        setEnteredPassword(newEnteredPassword);
    }

    function signUpHandler(){
        //navigation.navigate('NewRegisterStudent');
        //console.log(enteredEmail);
        //console.log(enteredPassword);
        setTypeUserVisible(true);
    }

    function onBackHandler(){
        setTypeUserVisible(false);
    }

    function newLogin(){
        navigation.navigate('Login', {
            testSendInfo: 'From the Register'
        });
    }

    return(
        <View style={styles.globalContainer}>  
            <View style={styles.registerLabelBox}>
                <Text style={styles.registerLabel}>
                    REGISTER
                </Text> 
            </View>  
            

            <InfoInput 
                name='mail'
                placeholder='Enter your email'
                color='#9d9d9d'    
                onSaveInfo={newEmailHandler}            
            />

            <InfoInput 
                name='key'
                placeholder='Enter your password'
                color='#9d9d9d'
                onSaveInfo={newPasswordHandler} 
            />

            <InfoInput 
                name='key'
                placeholder='Repeat your password'
                color='#9d9d9d'
            />

            <ButtonInfoInput text='SIGNUP' onPressGeneral={signUpHandler}/>

            <MicroPressText text='Already have an account'  onNewPress={newLogin}/>

            <TypeUser visible={typeUserVisible} onBack={onBackHandler}/>
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
    }

});
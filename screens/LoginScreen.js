import {
    View, 
    StyleSheet, 
    Text,
    Alert
} from 'react-native';

import { useContext, useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import Colors from '../constants/colors';

import InfoInputWithLogo from '../components/InputComponents/InfoInputWithLogo';
import ButtonInfoInput from '../components/ButtonComponents/ButtonInfoInput';
import MicroPressText from '../components/PressableTextComponents/MicroPressText';
import LoadingOverlay from '../components/LoadingOverlay';

import { deleteAccount, login } from '../util/auth';
import { AuthContext } from '../store/auth-context';
import { fetchUser } from '../util/http';

function LoginScreen({navigation}){
    const authCtx = useContext(AuthContext);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            setIsAuthenticating(false);
        };
    }, [isFocused]);

    async function toHome(){
        setIsAuthenticating(true);
        try{
            const tokenData = await login(
                enteredEmail.trim(), 
                enteredPassword.trim()
            );            
            
            try {
                const userInfo = await fetchUser(tokenData.localId); 
                userInfo.tokenId = tokenData.idToken;
                authCtx.currentUser(userInfo);
                authCtx.authenticate(tokenData.idToken);  
            } catch {
                Alert.alert('Oh no!', 'You did not complete the register, try again please.');
                await deleteAccount(tokenData.idToken);
                navigation.navigate('Register');
            }                                    
        }
        catch (error){
            console.log(error);
            setIsAuthenticating(false);
            Alert.alert('Something is wrong', 'Your email or password is incorrect');
        }             
    }

    function newRegister(){
        navigation.navigate('Register');
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging..." />;
    }

    return(
        <View style={styles.globalContainer}>     
            <View style={styles.loginLabelBox}>
                <Text style={styles.loginLabel}>
                    LOGIN
                </Text> 
            </View> 

            <InfoInputWithLogo
                name='mail'
                placeholder='Enter your email'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredEmail}
                value = {enteredEmail}
            />

            <InfoInputWithLogo
                name='key'
                placeholder='Enter your password'
                color={Colors.gray_placeholder}
                onSaveInfo = {setEnteredPassword}
                value = {enteredPassword}
            />

            <ButtonInfoInput 
                text='LOGIN'
                onPressGeneral={toHome}
            />

            <MicroPressText text='Create an account' onNewPress={newRegister}/>

            <MicroPressText text='Forgot the password'/>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    globalContainer:{
        flex: 1,
        paddingHorizontal: 35,
        paddingVertical: 10,      
        alignItems: 'center' 
    },
    loginLabelBox: {
        paddingBottom: 10,
        marginBottom: 25,
        borderBottomWidth: 3,
        borderBottomEndRadius: 20,
        borderBottomColor: Colors.color_lightGreen
    },
    loginLabel: {
        color: Colors.color_lightGreen,
        fontSize: 40,
        fontWeight: 'bold'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },    
    logoIco: {
        paddingRight: 10
    },
    InfoInputWithLogo: {
        width: '90%',
        borderWidth: 2,
        borderColor: Colors.color_lightGreen,
        paddingLeft: 10,
        height: 30
    },
});
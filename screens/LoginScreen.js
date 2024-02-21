import {
    View, 
    StyleSheet, 
    Text,
    Alert
} from 'react-native';

import { useContext, useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import Colors from '../constants/colors';

import { SCHOOLS, TEACHERS, PARENTS, STUDENTS, GROUPS } from '../data/dummy-data';

import InfoInputWithLogo from '../components/InputComponents/InfoInputWithLogo';
import ButtonInfoInput from '../components/ButtonComponents/ButtonInfoInput';
import MicroPressText from '../components/PressableTextComponents/MicroPressText';
import LoadingOverlay from '../components/LoadingOverlay';

import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';
import { fetchUser } from '../util/http';

function LoginScreen({navigation}){
    const authCtx = useContext(AuthContext);

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

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
                enteredEmail, 
                enteredPassword
            );
            authCtx.authenticate(tokenData.idToken);  
            
            const userInfo = await fetchUser(tokenData.localId); 
            authCtx.currentUser(userInfo);           
            
            navigation.navigate('UserNavigation', {
                userHome: userInfo.type,
                user: userInfo.data
            });

        }
        catch (error){
            setIsAuthenticating(false);
            setShowError(true);
            Alert.alert('Something is wrong', 'Your email or password is incorrect');
            //console.log(error);
        }        
        
        // const entities = [
        //     { list: SCHOOLS, route: 'SchoolHome'},
        //     { list: TEACHERS, route: 'TeacherHome'},
        //     { list: PARENTS, route: 'ParentHome' },
        //     { list: STUDENTS, route: 'StudentHome' }
        // ];      

        // const entity = entities.find(entry => entry.list.some(item => item.email === enteredEmail));

        // if (entity) {
        //     const element = entity.list.find(item => item.email === enteredEmail);
            
        //     navigation.navigate('UserNavigation', {
        //         userHome: entity.route,
        //         user: element
        //     });
        // } else {
        //     setErrorMessage('This user does not exist.');
        // }        

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

            {showError &&(
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}

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
    errorText: {
        color: Colors.error_red
    }
});
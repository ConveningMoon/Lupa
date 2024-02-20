import {
    View, 
    StyleSheet, 
    Text
} from 'react-native';

import { useContext, useState } from 'react';

import Colors from '../constants/colors';

import { SCHOOLS, TEACHERS, PARENTS, STUDENTS, GROUPS } from '../data/dummy-data';

import InfoInputWithLogo from '../components/InputComponents/InfoInputWithLogo';
import ButtonInfoInput from '../components/ButtonComponents/ButtonInfoInput';
import MicroPressText from '../components/PressableTextComponents/MicroPressText';
import LoadingOverlay from '../components/LoadingOverlay';

import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

function LoginScreen({navigation, route}){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function toHome(){
        // setIsAuthenticating(true);
        // try{
        //     const token = await login(
        //         route.params.email, 
        //         route.params.password
        //     );
        //     authCtx.authenticate(token);
        // }
        // catch (error){
        //     setIsAuthenticating(false);
        // }        
        
        const entities = [
            { list: SCHOOLS, route: 'SchoolHome'},
            { list: TEACHERS, route: 'TeacherHome'},
            { list: PARENTS, route: 'ParentHome' },
            { list: STUDENTS, route: 'StudentHome' }
        ];      

        const entity = entities.find(entry => entry.list.some(item => item.email === enteredEmail));

        if (entity) {
            const element = entity.list.find(item => item.email === enteredEmail);
            
            navigation.navigate('UserNavigation', {
                userHome: entity.route,
                user: element
            });
        } else {
            setErrorMessage('This user does not exist.');
        }        

    }

    function newRegister(){
        navigation.navigate('Register');
    }

    // if (isAuthenticating) {
    //     return <LoadingOverlay message="Logging..." />;
    // }

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
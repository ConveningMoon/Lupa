import {
    View, 
    StyleSheet, 
    Text
} from 'react-native';

import Colors from '../constants/colors';

import InfoInput from '../components/InfoInput';
import ButtonInfoInput from '../components/ButtonInfoInput';
import MicroPressText from '../components/MicroPressText';

function RegisterScreen({navigation, route}){
    const testReceiveInfo = route.params.testSendInfo;

    function newRegister(){
        navigation.navigate('Register');
    }

    return(
        <View style={styles.globalContainer}>     
            <View style={styles.loginLabelBox}>
                <Text style={styles.loginLabel}>
                    LOGIN
                </Text> 
            </View> 

            <InfoInput 
                name='mail'
                placeholder='Enter your email'
                color='#9d9d9d'
            />

            <InfoInput 
                name='key'
                placeholder='Enter your password'
                color='#9d9d9d'
            />

            <ButtonInfoInput text='LOGIN'/>

            <MicroPressText text='Create an account' onNewPress={newRegister}/>

            <MicroPressText text='Forgot the password'/>
            <Text style={{padding: 20}}>{testReceiveInfo}</Text>
        </View>
    );
}

export default RegisterScreen;

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
    }
});
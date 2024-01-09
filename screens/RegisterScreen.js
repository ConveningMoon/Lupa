import {
    View, 
    StyleSheet, 
    Text
} from 'react-native';

import InfoInput from '../components/infoInput';
import ButtonInfoInput from '../components/ButtonInfoInput';
import MicroPressText from '../components/MicroPressText';

function RegisterScreen(){
    return(
        <View style={styles.globalContainer}>     
            <Text style={styles.registerLabel}>
                REGISTER
            </Text> 

            <InfoInput 
                source={require('../assets/img/EmailIco.png')}
                placeholder='Enter your email'
                color='#9d9d9d'
            />

            <InfoInput 
                source={require('../assets/img/PasswordIco.png')}
                placeholder='Enter your password'
                color='#9d9d9d'
            />

            <InfoInput 
                source={require('../assets/img/PasswordIco.png')}
                placeholder='Repeat your password'
                color='#9d9d9d'
            />

            <ButtonInfoInput text='SIGNUP'/>

            <MicroPressText text='Already have an account'/>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    globalContainer:{
        flex: 1,
        margin: 15,
        paddingTop: 20,        
        alignItems: 'center' 
    },
    registerLabel: {
        color: '#79AE92',
        fontSize: 40,
        padding: 20,
        marginBottom: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#79AE92'
    },
});
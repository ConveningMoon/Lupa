import {
    View, 
    StyleSheet, 
    Text,
    Button,
    TextInput
} from 'react-native';
import { useState } from 'react';

import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

import { SCHOOLS, TEACHERS, PARENTS, STUDENTS } from '../data/dummy-data';

import InfoInput from '../components/InfoInput';
import ButtonInfoInput from '../components/ButtonInfoInput';
import MicroPressText from '../components/MicroPressText';

function LoginScreen({navigation, route}){
    const [userEmail, setUserEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    function toHome(){
        const entities = [
            { list: SCHOOLS, route: 'SchoolHome' },
            { list: TEACHERS, route: '' },
            { list: PARENTS, route: '' },
            { list: STUDENTS, route: '' }
        ];          
        const entity = entities.find(entry => entry.list.some(item => item.email === userEmail));
        if(entity){
            const element = entity.list.find(item => item.email === userEmail);
            navigation.navigate(entity.route, {user: element});
        } else {
            setErrorMessage(true);
        }        

    }

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
            {errorMessage &&(
                <Text style={styles.errorText}>Incorrect email or password</Text>
            )}
            <View style={styles.infoContainer}>    
                <View style={styles.logoIco}>
                    <Ionicons
                        name='mail'
                        size={30}
                        color={Colors.color_lightGreen}
                    />     
                </View>               
                <TextInput
                    placeholder='Enter your email'
                    placeholderTextColor={Colors.gray_placeholder}
                    style={styles.infoInput}
                    value={userEmail}
                    onChangeText={setUserEmail}                
                />
            </View>


            <View style={styles.infoContainer}>    
                <View style={styles.logoIco}>
                    <Ionicons
                        name='key'
                        size={30}
                        color={Colors.color_lightGreen}
                    />     
                </View>               
                <TextInput
                    placeholder='Enter your password'
                    placeholderTextColor={Colors.gray_placeholder}
                    style={styles.infoInput}
                    //value={enteredPassword}
                    //onChangeText={setEnteredPassword}                
                />
            </View>

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
    infoInput: {
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
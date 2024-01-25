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

function RegisterScreen({navigation}){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredRepeatPassword, setEnteredRepeatPassword] = useState('');
    const [typeUser, setTypeUser] = useState('Not selected');
    const [typeUserVisible, setTypeUserVisible] = useState(false);


    function selectUserType(){
        setTypeUserVisible(true);
    }

    function signUpHandler(){
        if(typeUser === 'School'){
            navigation.navigate('NewRegisterSchool');
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
                    value={enteredEmail}
                    onChangeText={setEnteredEmail}                
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
                    value={enteredPassword}
                    onChangeText={setEnteredPassword}                
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
                    placeholder='Repeat your password'
                    placeholderTextColor={Colors.gray_placeholder}
                    style={styles.infoInput}
                    value={enteredRepeatPassword}
                    onChangeText={setEnteredRepeatPassword}                
                />
            </View>

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
    }

});
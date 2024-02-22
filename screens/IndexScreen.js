import { 
    View, 
    Text,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ButtonInfoInput from '../components/ButtonComponents/ButtonInfoInput';

import Colors from '../constants/colors';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

export default function IndexScreen({navigation}) {
    const authCtx = useContext(AuthContext);

    function onPressGeneralRegisterHandler(){
        navigation.navigate('Register');
    }

    function onPressGeneralLoginHandler(){
        navigation.navigate('Login');
    }
    
    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.generalContainer}>
                <View style={styles.generalContainer}>
                    <Image 
                        source={require('../assets/img/logo.png')}
                        style={styles.logoContainer}
                    />

                    <Text style={styles.logoText}>LUPA</Text>

                    <ButtonInfoInput 
                        text='REGISTER' 
                        onPressGeneral={onPressGeneralRegisterHandler}
                    />

                    <ButtonInfoInput 
                        text='LOGIN' 
                        onPressGeneral={onPressGeneralLoginHandler}
                    />
                </View>
                    
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        tintColor: Colors.color_lightGreen,
        marginBottom: 10,
        resizeMode: 'center',
        width: 200,
        height: 200,        
    },
    logoText: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50, 
        color: Colors.color_lightGreen
    }
});
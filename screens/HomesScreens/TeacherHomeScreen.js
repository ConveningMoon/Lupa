import { 
    View, 
    Text,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import ButtonInfoInput from '../../components/ButtonInfoInput';

import Colors from '../../constants/colors';

export default function IndexScreen({navigation}) {

    function onPressGeneralRegisterHandler(){
        navigation.navigate('Register');
    }

    function onPressGeneralLoginHandler(){
        navigation.navigate('Login', {
            testSendInfo: 'From the Index'
        });
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
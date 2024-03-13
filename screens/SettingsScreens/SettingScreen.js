import { 
    View, 
    Text,
    StyleSheet,
    Pressable 
} from 'react-native'

import { useContext } from 'react';

import { AuthContext } from '../../store/auth-context';

import ButtonToAdd from '../../components/ButtonComponents/ButtonToAdd';

export default function SettingScreen({navigation}) {
    const authCtx = useContext(AuthContext);

    function toLogin(){
        authCtx.logout();
    }

    function toChangeEmail() {
        navigation.navigate('ChangeEmail');
    }

    function toChangePassword() {
        navigation.navigate('ChangePassword');
    }

    function toChangeInfo() {
        navigation.navigate('ChangeInfo');
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.buttonsContainer}>
                <ButtonToAdd
                    text='CHANGE EMAIL'
                    onPressGeneral={toChangeEmail}
                />
                <ButtonToAdd
                    text='CHANGE PASSWORD'
                    onPressGeneral={toChangePassword}
                />
                <ButtonToAdd
                    text='CHANGE INFORMATION'
                    onPressGeneral={toChangeInfo}
                />
            </View>
            
            <Pressable
                style={styles.logOutContainer}
                onPress={toLogin}
            >
                <Text style={styles.logOutText}>Log Out</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center'
    },
    buttonsContainer: {
        flex: 1,
        width: '100%',
    },
    logOutContainer: {

    },
    logOutText: {
        color: 'red',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        paddingVertical: 20
    }
});
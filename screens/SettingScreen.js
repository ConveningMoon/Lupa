import { 
    View, 
    Text,
    StyleSheet,
    Pressable 
} from 'react-native'

import Colors from '../constants/colors';

import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

export default function SettingScreen({navigation}) {
    const authCtx = useContext(AuthContext);

    function toLogin(){
        authCtx.logout();
    }

    return (
        <View style={styles.globalContainer}>
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
    logOutContainer: {

    },
    logOutText: {
        color: 'red',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    }
});
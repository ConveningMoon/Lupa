import { 
    View, 
    Text,
    StyleSheet,
    Pressable 
} from 'react-native'

import Colors from '../constants/colors';

export default function SettingScreen() {
  return (
    <View style={styles.globalContainer}>
        <Pressable
            style={styles.logOutContainer}
            //onPress={}
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
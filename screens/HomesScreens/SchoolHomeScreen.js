import { 
    View, 
    Text,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Colors from '../../constants/colors';

export default function SchoolHomeScreen({navigation, route}) {
    const username = route.params.username;
    const name = route.params.name;
    const email = route.params.email;
    const website = route.params.website;

    return (
        <>
            <StatusBar style='dark'/>
            <SafeAreaView style={styles.generalContainer}>
                <View style={styles.generalContainer}>
                    <Text></Text>   
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
    usernameText: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50, 
        color: Colors.color_lightGreen
    }
});
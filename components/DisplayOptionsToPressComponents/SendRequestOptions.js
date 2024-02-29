import { 
    View, 
    Text,
    StyleSheet,
    Pressable
} from 'react-native';

import Colors from '../../constants/colors';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SendRequestOptions(props) {
  return (
    <View style={styles.globalContainer}>
        <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{props.name}</Text>
            <Text style={styles.usernameText}>{props.username}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Pressable
                onPress={props.onPress}
            >
                <MaterialCommunityIcons name="account-plus" size={35} color={Colors.color_lightGreen} />            
            </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    globalContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center'


    },
    nameText: {
        fontWeight: 'bold',
        color: Colors.color_lightGreen,
        fontSize: 20
    },
    usernameText: {
        color: Colors.color_darkGreen,
        fontSize: 15

    },
    buttonContainer: {
        flexDirection: 'row'
    }
});
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../constants/colors';

export default function ChangeTypeUser(props) {
  return (
    <View style={styles.globalContainer}>
        <Text style={styles.typeText}>Select your user's type:   </Text>
        <Pressable onPress={props.onPress}>
            <Text style={styles.userText}>{props.typeUserText}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    globalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    typeText: {
        fontSize: 16,
        color: Colors.color_lightGreen,
        fontWeight: '600'
    },
    userText: {
        color: Colors.color_darkGreen,
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
});
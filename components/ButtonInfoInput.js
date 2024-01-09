import { View, Text, Pressable, StyleSheet} from 'react-native';

export default function ButtonInfoInput(props) {
  return (
    <Pressable style={styles.signupButton} android_ripple={{ color: '#1C5560' }}>
        <Text style={styles.signupText}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    signupButton: {
        marginTop: 20,
        paddingHorizontal: 130,
        paddingVertical: 15,
        backgroundColor: '#79AE92',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    signupText: {
        color: '#ffffff',
        fontSize: 15
    }
});
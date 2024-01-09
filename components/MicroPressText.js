import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function MicroPressText(props) {
  return (
    <Pressable>
      <Text style={styles.microtext}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    microtext: {
        color: '#1C5560',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        paddingTop: 10
    }
});
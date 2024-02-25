import {Text, Pressable, StyleSheet } from 'react-native'

import Colors from '../../constants/colors';

export default function MicroPressText(props) {
  return (
    <Pressable>
      <Text style={styles.microtext} onPress={props.onNewPress}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    microtext: {
      color: Colors.color_darkGreen,
      fontStyle: 'italic',
      textDecorationLine: 'underline'
    },
    pressedText: {
      color: Colors.color_boneYellow,
      borderWidth: 10
    }
});
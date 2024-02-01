import { 
    View, 
    Text,
    Pressable,
    StyleSheet
} from 'react-native';

import Colors from '../../constants/colors';

export default function TableOptions(props) {
  return (
    <View style={styles.globalContainer}>
        <Pressable 
            android_ripple={{ color: Colors.color_boneYellow, borderless: true}}
            style={({pressed}) => pressed && styles.generalButtonIOS}      
            onPress={props.onPressGeneral}
        >
            <Text style={styles.textStyle}>{props.text}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: 'center',
        margin: 10
    },
    generalButtonIOS: {
        opacity: 0.5,
        borderRadius: 20,
        backgroundColor: Colors.color_boneYellow
    },
    textStyle: {
        fontSize: 20,
        color: Colors.color_darkGreen,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: Colors.color_darkGreen,
        textShadowRadius: 25
    }
});
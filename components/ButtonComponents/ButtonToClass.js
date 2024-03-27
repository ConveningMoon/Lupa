import { 
    View, 
    Text,
    Pressable,
    StyleSheet,
    Platform
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/colors';

export default function ButtonToClass(props) {
    return (
        <View>
            <LinearGradient
                colors={props.colors ? props.colors : [Colors.color_lightGreen, Colors.color_darkBlue]}
                style={styles.gradientStyle}
                start={props.start}
            >
                <Pressable
                    onPress={props.onPressGeneral}
                >
                        <Text style={styles.generalText}>{props.text}</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    gradientStyle: {
        borderRadius: 20
    },
    generalText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 15
    }
});
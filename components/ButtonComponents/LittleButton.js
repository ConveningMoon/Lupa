import { 
    View, 
    Text,
    Pressable,
    StyleSheet
} from 'react-native';

import Colors from '../../constants/colors';

export default function LittleButton(props) {
    return (
        <View style={styles.generalButton}>
            <Pressable
            android_ripple={{ color: Colors.color_lightGreen, borderless: true}}
            style={({pressed}) => pressed && styles.generalButtonIOS}      
            onPress={props.onPressGeneral}
            >
                <Text style={styles.generalText}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    generalButton: {
        alignSelf: 'center',
        backgroundColor: Colors.color_darkGreen,
        borderRadius: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.25,   
        alignItems: 'center'        
    },
    generalButtonIOS: {
        opacity: 0.5,
        borderRadius: 20,
        backgroundColor: Colors.color_darkGreen
    },
    generalText: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30
    }
});
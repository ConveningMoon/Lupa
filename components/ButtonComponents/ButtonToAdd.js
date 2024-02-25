import { 
    View, 
    Text,
    Pressable,
    StyleSheet,
    Platform
} from 'react-native';

import Colors from '../../constants/colors';

export default function ButtonToAdd(props) {
    return (
        <View style={styles.generalButton}>
            <Pressable
            android_ripple={{ color: '#1C5560', borderless: true}}
            style={({pressed}) => 
                pressed && Platform.OS === 'ios'? 
                    styles.generalButtonIOS : {width: '100%'}
            }  
            onPress={props.onPressGeneral}
            >
                    <Text style={styles.generalText}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    generalButton: {
        marginBottom: 20,
        backgroundColor: Colors.color_lightGreen,
        borderRadius: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.25,   
        alignItems: 'center',
        width: '100%'  
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
        //backgroundColor: Colors.bg_red
    }
});
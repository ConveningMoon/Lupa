import { 
    View, 
    Text,
    Pressable,
    StyleSheet,
    Platform
} from 'react-native';

import Colors from '../../constants/colors';

export default function ButtonReport(props) {
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
        backgroundColor: Colors.color_lightGreen,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.25,   
        width: '100%',
        marginBottom: 5  
    },
    generalButtonIOS: {
        opacity: 0.5,
        borderRadius: 20,
        backgroundColor: Colors.color_darkGreen
    },
    generalText: {
        color: '#ffffff',
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 12,
        //backgroundColor: Colors.bg_red
    }
});
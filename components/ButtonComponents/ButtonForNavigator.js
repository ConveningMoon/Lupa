import { 
    View, 
    Text,
    Pressable,
    StyleSheet
} from 'react-native'

import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ButtonForNavigator(props) {
  return (
    <View style={styles.generalContainer}>
        <Pressable
            style={styles.pressableContainer}
        >
            <Ionicons 
                name={props.name} 
                size={24} 
                color={Colors.color_darkGreen}
            />
            <Text style={styles.pressableText}>
                {props.text}
            </Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1
    },
    pressableContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pressableText: {
        fontSize: 10,
        color: Colors.color_darkGreen
    }
});
import { 
    View, 
    TextInput,
    StyleSheet 
} from 'react-native'

import Colors from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';

export default function SearchInputText(props) {    
    return (
        <View style={styles.globalContainer}>
            <TextInput 
                style={styles.inputText} 
                placeholder='Search'
                placeholderTextColor={Colors.gray_placeholder}
                onChangeText={props.onChangeText}
                value={props.value}
            />
            <View style={styles.iconContainer}>
                <AntDesign name="search1" size={24} color={Colors.color_lightGreen} />
            </View>      
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputText: {
        width: '90%',
        borderWidth: 1,
        borderColor: Colors.color_lightGreen,
        paddingHorizontal: 10,
    },
    iconContainer: {
        paddingLeft: 5
    }
});
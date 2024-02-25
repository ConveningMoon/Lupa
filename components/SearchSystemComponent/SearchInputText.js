import { 
    View, 
    StyleSheet,
    TextInput
} from 'react-native';

import Colors from '../../constants/colors';

import { AntDesign } from '@expo/vector-icons';

export default function SearchInputText(props) {    
    return (
        <View style={styles.globalContainer}>            
            <AntDesign name="search1" size={20} color={Colors.gray_placeholder} />
            <TextInput 
                style={styles.inputText} 
                placeholder='Search'
                placeholderTextColor={Colors.gray_placeholder}
                onChangeText={props.onChangeText}
                value={props.value}
            />                    
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: Colors.color_lightGreen,
        borderRadius: 10,
        paddingVertical: 3
    },
    inputText: {
        width: '90%',        
        paddingHorizontal: 10,
    },
    iconContainer: {
        paddingLeft: 5
    }
});
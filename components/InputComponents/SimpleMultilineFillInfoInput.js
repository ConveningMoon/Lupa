import {
    View, 
    StyleSheet, 
    TextInput,
    Text
} from 'react-native';

import Colors from '../../constants/colors';

function InfoInputWithLogo(props){    
    return(
        <View style={styles.mainContainer}>                  
            <Text style={styles.textContainer}>
                {props.text}
            </Text>
            <TextInput 
                style={styles.inputContainer}
                onChangeText={props.onChangeText}
                multiline={true}
                placeholder={props.placeholder}
            />
        </View>
    );
}


export default InfoInputWithLogo;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 20
    },   
    textContainer: {
        fontSize: 16,
        paddingBottom: 5,
        color: Colors.color_lightGreen,
        fontWeight: 'bold'        
    },
    inputContainer: {
        borderBottomWidth: 2,
        width: '100%',
        borderColor: Colors.color_lightGreen,
        fontSize: 14,
        marginBottom: 20
    }
});
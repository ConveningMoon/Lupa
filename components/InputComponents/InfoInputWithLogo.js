import {
    View, 
    StyleSheet, 
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';

function InfoInputWithLogo(props){    
    return(
        <View style={styles.infoContainer}>    
            <View style={styles.logoIco}>
                <Ionicons
                    name={props.name}
                    size={30}
                    color={Colors.color_lightGreen}
                />     
            </View>               
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor={props.color}
                style={styles.infoInput}
                value={props.value}
                onChangeText={props.onSaveInfo}  
                keyboardType={props.keyboardType}  
                secureTextEntry={props.secureTextEntry}            
            />
        </View>
    );
}


export default InfoInputWithLogo;

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },    
    logoIco: {
        paddingRight: 10
    },
    infoInput: {
        width: '90%',
        borderWidth: 2,
        borderColor: Colors.color_lightGreen,
        paddingLeft: 10,
        height: 30
    }
});
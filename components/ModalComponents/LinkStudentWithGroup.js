import { 
    View, 
    StyleSheet, 
    Modal,
    Text, 
    Alert
} from 'react-native';

import MicroPressText from '../PressableTextComponents/MicroPressText';
import LittleButton from '../ButtonComponents/LittleButton';
import SimpleFillInfoInput from '../InputComponents/SimpleFillInfoInput';

import Colors from '../../constants/colors';

export default function LinkStudentWithGroup(props) {
    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <Text style={styles.titleText}>ADD NEW STUDENT'S GROUP</Text>
                <View style={styles.contentContainer}>
                    <SimpleFillInfoInput 
                        text='Name of the group to add'
                        onChangeText={props.onChangeText}
                    />
                 </View>
                <View style={styles.buttonsContainer}>
                    <MicroPressText text='CANCEL' onNewPress={props.onBack}/>
                    <LittleButton text='ADD' onPressGeneral={props.onAdd}/>
                </View>                
            </View>            
        </Modal>
    )
}

const styles = StyleSheet.create({
    globalContainer: {        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        color: Colors.color_darkGreen,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 30
    },
    contentContainer: {
        width: '80%',
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '45%',
        marginTop: 30,
        flexDirection: 'row',
    }
});
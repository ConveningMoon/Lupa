import { 
    View, 
    StyleSheet, 
    Modal,
    Text, 
    Alert
} from 'react-native';

import { useContext, useState } from 'react';

import MicroPressText from '../PressableTextComponents/MicroPressText';
import LittleButton from '../ButtonComponents/LittleButton';
import SimpleFillInfoInput from '../InputComponents/SimpleFillInfoInput';

import Colors from '../../constants/colors';

import { AuthContext } from '../../store/auth-context';

import { addSubjectToSchool } from '../../util/school-http';


export default function NewSubjectInfo(props) {
    const authCtx = useContext(AuthContext)

    const [nameSubject, setNameSubject] = useState('');

    async function addNewSubject() {
        if (authCtx.infoUser.data.subjects.includes(nameSubject.trim())) {
            Alert.alert('Subject already exists!', 'This subject already is in your subjects.');
        } else {
            await addSubjectToSchool(authCtx.infoUser.data.id, nameSubject.trim()); 
        }
        props.onBack();
    }

    function addHandler() {
        Alert.alert('Add a new subject?', `Are you sure to add ${nameSubject.trim()} as new subject?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => addNewSubject()
            }
        ]);
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <Text style={styles.titleText}>ADD NEW SUBJECT</Text>
                <View style={styles.contentContainer}>
                    <SimpleFillInfoInput 
                        text='Name'
                        onChangeText={setNameSubject}
                    />
                 </View>
                <View style={styles.buttonsContainer}>
                    <MicroPressText text='CANCEL' onNewPress={props.onBack}/>
                    <LittleButton text='ADD' onPressGeneral={addHandler}/>
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
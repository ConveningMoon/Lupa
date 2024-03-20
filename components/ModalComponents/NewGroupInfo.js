import { 
    View, 
    StyleSheet, 
    Modal,
    Text, 
    Alert
} from 'react-native';

import { useContext, useEffect, useState } from 'react';

import MicroPressText from '../PressableTextComponents/MicroPressText';
import LittleButton from '../ButtonComponents/LittleButton';
import BadgeDropDown from '../DropDownSystemComponents/BadgeDropDown';
import SimpleFillInfoInput from '../InputComponents/SimpleFillInfoInput';

import Colors from '../../constants/colors';

import { registerNewGroup } from '../../util/group-http';

import { AuthContext } from '../../store/auth-context';

import { useIsFocused } from '@react-navigation/native';

import LoadingOverlay from '../LoadingOverlay';


export default function NewGroupInfo(props) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [nameGroup, setNameGroup] = useState('');
    const [subjectsData, setSubjectsData] = useState();
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [infoIsLoading, setInfoIsLoading] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            setInfoIsLoading(true);    
            async function getSubjects() {    
                const subjects = [];
    
                for (let subject in user.subjects) {
                    subjects.push({label: user.subjects[subject], value: user.subjects[subject]});
                }
                
                setSubjectsData(subjects);
                setInfoIsLoading(false);
            }

            getSubjects();
        }
    }, [isFocused])

    async function addNewGroup() {
        await registerNewGroup({
            name: nameGroup,
            school: authCtx.infoUser.data.id,
            subjects: selectedSubjects.map(item => item.value)
        });
        props.onBack();
        props.reloadData();
    }

    function addHandler() {
        Alert.alert('Add a new group?', `Are you sure to add ${nameGroup} as new group?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: () => addNewGroup()
            }
        ]);
    }

    if (infoIsLoading) {
        return <LoadingOverlay message="Loading info..." />;
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <Text style={styles.titleText}>ADD NEW GROUP</Text>
                <View style={styles.contentContainer}>
                    <SimpleFillInfoInput 
                        text='Name'
                        onChangeText={setNameGroup}
                    />
                 </View>
                 <View style={styles.contentContainer}>
                    <BadgeDropDown
                        elements={subjectsData}
                        multiple={true}
                        placeholder='Your subjects...'
                        onSelectItem={setSelectedSubjects}
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
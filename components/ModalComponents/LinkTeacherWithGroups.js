import { 
    View, 
    StyleSheet, 
    Modal,
    Text, 
} from 'react-native';

import MicroPressText from '../PressableTextComponents/MicroPressText';
import LittleButton from '../ButtonComponents/LittleButton';
import BadgeDropDown from '../DropDownSystemComponents/BadgeDropDown';
import LoadingOverlay from '../LoadingOverlay';

import Colors from '../../constants/colors';

import { fetchGroups } from '../../util/group-http';

import { useContext, useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { AuthContext } from '../../store/auth-context';


export default function LinkTeacherWithGroups(props) {
    const authCtx = useContext(AuthContext);
    const user = authCtx.infoUser.data;

    const [groupsData, setGroupsData] = useState([]);

    const [infoIsLoading, setInfoIsLoading] = useState(true);
    const [subjectsData, setSubjectsData] = useState();

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            setInfoIsLoading(true);
            async function getGroups() {
                const response = await fetchGroups(props.idSchool, true);

                console.log(response);
                if (!!response) {
                    const groups = [];
            
                    for (let group in response) {
                        groups.push({label: response[group].data.name, value: response[group].id});
                    }

                    setGroupsData(groups);
                }   
            }
    
            async function getSubjects() {  
                const subjects = [];
                
                if(user.subjects.length !== 0) {
                    for (let subject in user.subjects) {
                        subjects.push({label: user.subjects[subject], value: user.subjects[subject]});
                    }
        
                    setSubjectsData(subjects);
                }
            }

            getGroups();
            getSubjects();

            setInfoIsLoading(false);
        }
    }, [isFocused])
    

    if (infoIsLoading) {
        return <LoadingOverlay message="Loading info..." />;
    }

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <Text style={styles.titleText}>ADD NEW TEACHER'S GROUPS</Text>
                <View style={styles.contentContainer}>
                    <BadgeDropDown
                        elements={groupsData}
                        multiple={true}
                        placeholder='Your groups...'
                        onSelectItem={props.onSelectItemGroup}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <BadgeDropDown
                        elements={subjectsData}
                        placeholder='Your subjects...'
                        onSelectItem={props.onSelectItemSubject}
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
        marginBottom: 120,
        width: '80%'
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '45%',
        flexDirection: 'row',
    }
});
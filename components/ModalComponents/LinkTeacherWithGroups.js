import { 
    View, 
    StyleSheet, 
    Modal,
    Text, 
    Alert,
    Button
} from 'react-native';

import MicroPressText from '../PressableTextComponents/MicroPressText';
import LittleButton from '../ButtonComponents/LittleButton';
import BadgeDropDown from '../DropDownSystemComponents/BadgeDropDown';

import Colors from '../../constants/colors';
import { fetchGroups } from '../../util/http';
import { useEffect, useState } from 'react';

export default function LinkTeacherWithGroups(props) {
    const [groupsData, setGroupsData] = useState([]);

    useEffect(() => {
        async function getGroups() {
            const response = await fetchGroups(props.idSchool)
    
            const groups = [];
    
            for (let group in response) {
                groups.push({label: response[group].data.name, value: response[group].id});
            }
    
            setGroupsData(groups);
        }

        getGroups();
    }, [])
    

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.globalContainer}>
                <Text style={styles.titleText}>ADD NEW TEACHER'S GROUPS</Text>
                <View style={styles.contentContainer}>
                    <BadgeDropDown
                        elements={groupsData}
                        multiple={true}
                        placeholder='Your groups...'
                        onSelectItem={props.onSelectItem}
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
        marginTop: 120
    }
});
import { 
    View, 
    Text, 
    StyleSheet,
    Pressable,
    Alert
} from 'react-native';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import ButtonToClass from '../../components/ButtonComponents/ButtonToClass';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

import { useContext, useLayoutEffect } from 'react';

import { AuthContext } from '../../store/auth-context';

import { deleteGroup } from '../../util/group-http';
import { fetchStudents } from '../../util/student-http';
import { unlinkStudentWithSchool } from '../../util/request-http';

export default function GroupsInfoScreen({navigation, route}) {  
    const authCtx = useContext(AuthContext)

    const group = route.params.group;

    useLayoutEffect (() => {
        navigation.setOptions({
            title: `${group.data.name}'s Information`
        });

    },[]);

    function toStudents(){ 
        navigation.navigate('Students',{
            id: group.id,
            fromSchool: false,
            fromGroup: true,
            fromParent: false,
            fromNewParent: false
        }); 
        
    }

    function toTeachers(){
        navigation.navigate('Teachers',{
            id: group.id,
            fromSchool: false,
            fromGroup: true
        }); 
    }

    function deleteGroupHandler() {
        Alert.alert('Delete this group?', `Are you sure to delete the group: ${group.data.name} ?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {

                    const response = await fetchStudents(group.id, false, true, false, false);
                    
                    if(response) {
                        for(let key in response) {
                            await unlinkStudentWithSchool(response[key].id);
                        }
                    }
                    
                    await deleteGroup(group.id);

                    Alert.alert('Done', 'Group deleted!');
                    navigation.navigate('School');
                }

            }
        ]);
    }

    function reportHandler() {
        navigation.navigate('GroupReport', {
            group: group
        });
    }

    return (
        <View style={styles.globalContainer}>

            <Text style={styles.textGroupName}>{group.data.name}</Text>

            {authCtx.infoUser.type === 'School' &&
                <Pressable
                    style={styles.deleteGroupPressableContainer}
                    onPress={deleteGroupHandler}
                >
                    <MaterialCommunityIcons name="account-multiple-minus" size={24} color={Colors.error_red}/>
                    <Text style={styles.deleteGroupsText}>  Delete this group</Text>
                </Pressable>
            }

            <View style={styles.allButtonsContainer}> 
                <ButtonInfoInput 
                    text='SHOW STUDENTS'
                    onPressGeneral={toStudents}
                />

                <ButtonInfoInput 
                    text='SHOW TEACHERS'
                    onPressGeneral={toTeachers}
                />

                <ButtonInfoInput 
                    text='SHOW SUBJECTS'
                    //onPressGeneral={toTeachers}
                />
            </View>
            <ButtonToClass
                text='REPORT'
                onPressGeneral={reportHandler}
                colors={[Colors.color_lightGreen, Colors.color_darkBlue]}
                start={{x: 0, y: 0}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
    },
    textGroupName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        padding: 10
    },
    allButtonsContainer: {
        paddingTop: 30,
        flex: 1
    },
    deleteGroupPressableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 10,
        alignSelf: 'flex-start'
    },
    deleteGroupsText: {
        color: Colors.error_red
    }
});
import { 
    View, 
    Text, 
    StyleSheet,
    Pressable,
    Alert
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../store/auth-context';

import { deleteSubject } from '../../util/subject-http';

import { useIsFocused } from '@react-navigation/native';

export default function SubjectsInfoScreen({navigation, route}) {  
    const authCtx = useContext(AuthContext)

    const subject = route.params.subject;

    const [teacher, setTeacher] = useState('No teacher');

    const isFocused = useIsFocused();

    function deleteGroupHandler() {
        Alert.alert('Delete this subject?', `Are you sure to delete the subject: ${subject.data.name} ?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes', onPress: async () => {
                    await deleteSubject(subject.id);

                    Alert.alert('Done', 'subject deleted!');
                    navigation.navigate('School');
                }

            }
        ]);
    }

    useEffect(() => {
        if (isFocused) {
            //initialSubjectsData();
        }
    }, [isFocused]);

    return (
        <View style={styles.globalContainer}>

            <Text style={styles.textGroupName}>{subject.data.name}</Text>

            {authCtx.infoUser.type === 'School' &&
                <Pressable
                    style={styles.deleteGroupPressableContainer}
                    onPress={deleteGroupHandler}
                >
                    <MaterialCommunityIcons name="account-multiple-minus" size={24} color={Colors.error_red}/>
                    <Text style={styles.deleteGroupsText}>  Delete this subject</Text>
                </Pressable>
            }

            <Pressable style={styles.teacherPressableContainer}>
                <Text>Teacher: {teacher}</Text>
            </Pressable>
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
    },
    teacherPressableContainer: {
        marginHorizontal: 10
    },
    teacherText: {

    }
});
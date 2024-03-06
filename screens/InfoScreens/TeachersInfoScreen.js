import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    Pressable
} from 'react-native';

import { TEACHERS, PARENTS, GROUPS } from '../../data/dummy-data';

import ButtonInfoInput from '../../components/ButtonComponents/ButtonInfoInput';
import LoadingOverlay from '../../components/LoadingOverlay';

import Colors from '../../constants/colors';

import { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';

import { fetchGroupInfo, fetchUser } from '../../util/http';

export default function TeachersInfoScreen({navigation, route}) { 
    const teacher = route.params.user;

    const [teacherSchoolInfo, setTeacherSchoolInfo] = useState({name: 'No School'});

    const [profileIsLoading, setProfileIsLoading] = useState(true);
    const isFocused = useIsFocused();

    async function findSchool(idSchool) {
        const response = await fetchUser(idSchool);

        setTeacherSchoolInfo(response.data);
        setProfileIsLoading(false);
    }


    useEffect(() => {
        if(isFocused) {
            if(teacher.school !== '') {
                findSchool(teacher.school);
            } else {
                setProfileIsLoading(false);
            } 
        }
    }, [isFocused])

    function toSchool() {

    }

    function toGroups() {
        navigation.navigate('Groups', {
            fromSchool: false,
            fromTeacher: true,
            idGroups: teacher.groups
        });
    }

    if (profileIsLoading) {
        return <LoadingOverlay message="Loading information..." />;
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.topInfoContainer}>
                <View style={styles.nameUsernameContainer}>
                    <Text style={styles.userName}>{teacher.name}</Text>
                    <Text style={styles.usernameText}>{teacher.username}</Text>
                    <Text style={styles.emailText}>Contact: {teacher.emailContact}</Text>
                    <View style={styles.schoolContainer}>
                        <Text 
                            style={{
                                fontSize: 20,
                                color: Colors.color_darkGreen
                            }}
                        >
                            School: 
                        </Text>
                        <Pressable onPress={toSchool} disabled={!teacher.school}>
                            <Text style={styles.schoolText}>{teacherSchoolInfo.name}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.allButtonsContainer}>
                <ButtonInfoInput 
                    text='GROUPS'
                    onPressGeneral={toGroups}
                />
                <ButtonInfoInput 
                    text='SUBJECTS'
                    //onPressGeneral={searchTeachers}
                />                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        margin: 10
    },
    topInfoContainer: {
        flexDirection: 'row'
    },
    nameUsernameContainer: {
        flex: 1
    },
    userName: {
        fontSize: 30,
        color: Colors.color_lightGreen,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    usernameText: {
        fontStyle: 'italic',
        color: Colors.color_darkGreen,
        paddingHorizontal: 10
    },
    emailText: {
        marginLeft: 10,
        paddingTop: 10,
        fontSize: 12,
        paddingBottom: 10
    },
    schoolContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row'
    },
    schoolText: {
        textDecorationLine: 'underline',
        color: Colors.color_darkGreen,
        fontSize: 20,
        paddingLeft: 5
    },
    parentsContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    parentsText: {
        color: Colors.color_darkBlue
    },
    textStudentParents: {
        color: Colors.color_lightGreen,
        fontWeight: 'bold'
    },
    allButtonsContainer: {
        paddingTop: 30,
        alignItems: 'center' 
    }
});